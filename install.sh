#!/bin/bash
set -e

# Check if the user is root
if [[ $EUID -eq 0 ]]; then
    echo "Error: This script should not be run as root."
    exit 1
fi



# Get the BigBlueButton version from the release file
version=$(grep -oP 'BIGBLUEBUTTON_RELEASE=\K[\d.]+' /etc/bigbluebutton/bigbluebutton-release)

# Print the version
echo "BigBlueButton version: $version"

# Conditional check
if [[ $version == "2.6.10" ]]; then
    echo "Version is 2.6.10"

    cd streaming-server/
    echo "$(pwd)"
   # Read the values from the bbb-web.properties file
    BBB_URL=$(grep -oP '(?<=bigbluebutton\.web\.serverURL=).*' /etc/bigbluebutton/bbb-web.properties)
    BBB_URL="${BBB_URL}/bigbluebutton/"
    BBB_SECRET=$(grep -oP '(?<=securitySalt=).*' /etc/bigbluebutton/bbb-web.properties)

    # Check if .env file exists
    if [[ -f .env ]]; then
      # Overwrite existing environment variables if they exist
    sed -i -E "s~^(BBB_URL=).*~\1${BBB_URL}~" .env
    sed -i -E "s~^(BBB_SECRET=).*~\1${BBB_SECRET}~" .env
    else
    # Create new .env file
    echo "BBB_URL=${BBB_URL}" >> .env
    echo "BBB_SECRET=${BBB_SECRET}" >> .env
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
    cd src/bigbluebutton-html5

    if npm install --legacy-peer-deps; then
      echo "Packages installed successfully"
    else 
      echo "Error:Failed install packages"
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
      echo "files are copied to meteor"
    else
       echo "Error: Failed copy files to meteor"
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
    if  npm install; then
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
    
    sudo usermod -aG docker $USER
    newgrp docker
    
else
    echo "Please use BigBlueButton 2.6.10"
fi
