#!/bin/bash
set -e

# Define an array of available versions
available_versions=("2.6.10" "2.6.12" "2.7.0-beta.2")  # Add more versions as needed

# Check if the user is root
if [[ $EUID -eq 0 ]]; then
    echo "Error: This script should not be run as root."
    exit 1
fi

# Get the BigBlueButton version from the release file
version=$(grep -oP 'BIGBLUEBUTTON_RELEASE=\K.*' /etc/bigbluebutton/bigbluebutton-release)

# Print the version
echo "BigBlueButton version: $version"

# Conditional check
if [[ " ${available_versions[@]} " =~ " ${version} " ]]; then
    echo "Version is $version"

    cd streaming-server/
    echo "$(pwd)"
   # Read the values from the bbb-web.properties file
    BBB_URL=$(grep -oP '(?<=bigbluebutton\.web\.serverURL=).*' /etc/bigbluebutton/bbb-web.properties)
    BBB_URL="${BBB_URL}/bigbluebutton/"
    BBB_SECRET=$(grep -oP '(?<=securitySalt=).*' /etc/bigbluebutton/bbb-web.properties)
    NUMBER_OF_CONCURRENT_STREAMINGS=1

    # Check if .env file exists
    if [[ -f .env ]]; then
        # Overwrite existing environment variables if they exist
        sed -i -E "s~^(BBB_URL=).*~\1${BBB_URL}~" .env
        sed -i -E "s~^(BBB_SECRET=).*~\1${BBB_SECRET}~" .env
        sed -i -E "s~^(NUMBER_OF_CONCURRENT_STREAMINGS=).*~\1${NUMBER_OF_CONCURRENT_STREAMINGS}~" .env
    else
        # Create new .env file
        echo "BBB_URL=${BBB_URL}" >> .env
        echo "BBB_SECRET=${BBB_SECRET}" >> .env
        echo "NUMBER_OF_CONCURRENT_STREAMINGS=${NUMBER_OF_CONCURRENT_STREAMINGS}" >> .env
    fi

    cat .env
    
    cd ..

    # Check if bundle-original folder already exists
    if [[ ! -d "/usr/share/meteor/bbb-html5-original" ]]; then
        # Copy bundle to bbb-html5-original folder
        sudo cp -R /usr/share/meteor/bundle /usr/share/meteor/bbb-html5-original || { echo "Error: Failed to copy bundle"; exit 1; }

        # Set ownership of copied files to the current user
        sudo chown -R $current_user:$current_user /usr/share/meteor/bbb-html5-original
    else
        echo "bbb-html5-original folder already exists. Skipping copy and ownership changes."
    fi
    
    # Navigate to src/bigbluebutton-html5 directory
    cd src/"${version}"

    if npm install --legacy-peer-deps; then
        echo "Packages installed successfully"
    else 
        echo "Error: Failed to install packages"
        exit 1
    fi

    # Install missing npm modules
    if npm install --save @material-ui/core --legacy-peer-deps; then
      echo "Missing Packages installed successfully"
    else
      echo "Error: Failed to install Missing packages"
      exit 1
    fi

    # Check if Meteor is installed
    if ! command -v meteor &> /dev/null; then
        # Meteor is not installed, so install it
        echo "Meteor is not installed. Installing Meteor..."
        curl https://install.meteor.com/ | sh
    else
        echo "Meteor is already installed"
    fi

    # Check if settings.yml exists before trying to remove it
    if [[ -f "$(pwd)"/private/config/settings.yml ]]; then 
        if sudo rm "$(pwd)"/private/config/settings.yml; then 
            echo "settings.yml removed successfully"
        else
            echo "Error: Failed to remove settings.yml"
            exit 1
        fi
    else
        echo "settings.yml does not exist. Skipping removal."
    fi

    if cp /usr/share/meteor/bundle/programs/server/assets/app/config/settings.yml "$(pwd)"/private/config/; then
      echo "Successfully copied settings.yml"
    else
     echo "Error: Failed to copy settings.yml" 
     exit 1
    fi
    
    # Create build folder if it doesn't exist
    build_path=$(dirname "$(dirname "$(pwd)")")/build
    if [[ ! -d "$build_path" ]]; then
        mkdir "$build_path" || { echo "Error: Failed to create build folder"; exit 1; }
    fi

    # Build the project
    if meteor build --server-only "$build_path"; then
        echo "Build successful"
    else
        echo "Error: Failed to build"
        exit 1
    fi
    
    cd ../../

    

    if sudo tar -xzvf "$(pwd)"/build/*.tar.gz -C /usr/share/meteor; then
        echo "Files are copied to meteor"
    else
        echo "Error: Failed to copy files to meteor"
        exit 1
    fi


    # Start bbb-html5 service
    if sudo systemctl start bbb-html5; then
        echo "bbb-html5 service started successfully"
    else
        echo "Error: Failed to start bbb-html5 service"
        exit 1
    fi

    # Check if bbb-streaming process is already running
    if pm2 describe bbb-streaming &> /dev/null; then
        # Stop and remove existing bbb-streaming process
        if pm2 stop bbb-streaming && pm2 delete bbb-streaming; then
            echo "Existing bbb-streaming process stopped and removed successfully"
        else
            echo "Error: Failed to stop and remove existing bbb-streaming process"
            exit 1
        fi
    fi

    # Navigate to streaming-server directory
    cd "$(pwd)"/streaming-server

    # Install packages
    if npm install; then
        echo "Packages installed successfully"
    else
        echo "Error: Failed to install packages"
        exit 1
    fi

    # Copy streaming.nginx file to /usr/share/bigbluebutton/nginx
    sudo cp streaming.nginx /usr/share/bigbluebutton/nginx || { echo "Error: Failed to copy streaming.nginx"; exit 1; }

    # Reload Nginx server
    if sudo systemctl reload nginx; then
        echo "Nginx server reloaded successfully"
    else
        echo "Error: Failed to reload Nginx server"
        exit 1
    fi

    # Build Docker image
    if sudo docker build -t bbb-stream:v1.0 .; then
        echo "Docker image built successfully"
    else
        echo "Error: Failed to build Docker image"
        exit 1
    fi

    # Install PM2
    sudo npm install -g pm2

    # Run npm start command with PM2
    if pm2 start npm --name "bbb-streaming" -- start; then
        echo "streaming-server started successfully"
    else
        echo "Error: Failed to start streaming-server"
        exit 1
    fi

    if sudo bbb-conf --restart; then
        echo "BigBlueButton restarted"
    else
        echo "Error: Failed to restart BigBlueButton"
        exit 1
    fi
        
else
    echo "Please use one of the following BigBlueButton versions: ${available_versions[@]}"
    exit 1
fi
