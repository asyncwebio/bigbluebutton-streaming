#!/bin/bash
set -e

# check user if root throw error
current_user=$(whoami)

if [[$current_user == "root"]]; then
    echo "Do not run this script in root"
    exit 1
fi

# Get the BigBlueButton version from the release file
version=$(grep -oP 'BIGBLUEBUTTON_RELEASE=\K[\d.]+' /etc/bigbluebutton/bigbluebutton-release)

# Print the version
echo "BigBlueButton version: $version"

# Conditional check
if [[ $version == "2.6.10" ]]; then
    echo "Version is 2.6.10"

    # Check if bundle-original folder already exists
    if [[ ! -d "/usr/share/meteor/bundle-original" ]]; then
        # Copy bundle to bundle-original folder
        sudo cp -R /usr/share/meteor/bundle /usr/share/meteor/bundle-original || { echo "Error: Failed to copy bundle"; exit 1; }

        # Set ownership of copied files to the current user
        
        sudo chown -R $current_user:$current_user /usr/share/meteor/bundle-original
    else
        echo "bundle-original folder already exists. Skipping copy and ownership changes."
    fi
    
        # Navigate to src/bigbluebutton-html5 directory
    cd src/bigbluebutton-html5

    if npm install --legacy-peer-deps; then
      echo "Packages installed successfully"
    else 
      echo "Error:Failed install packages"
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
else
    echo "Please use BigBlueButton 2.6.10"
fi
