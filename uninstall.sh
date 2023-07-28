#!/bin/bash
set -e

# Check if the user is root
if [[ $EUID -eq 0 ]]; then
    echo "Error: This script should not be run as root."
    exit 1
fi

# Check if the Docker container is running
if [[ $(docker ps --filter "name=bbb-stream" --format '{{.Names}}') == 'bbb-stream' ]]; then
    # Stop the Docker container
    docker stop bbb-stream
    echo "Container bbb-stream stopped successfully"
else
    echo "Container bbb-stream does not exist or is not running"
fi

# Check if the Docker image exists
if [[ $(docker images -q bbb-stream:v1.0) ]]; then
    # Remove the Docker image
    docker rmi bbb-stream:v1.0
    echo "Image bbb-stream:v1.0 removed successfully"
else
    echo "Image bbb-stream:v1.0 does not exist"
fi

# Check if streaming.nginx file exists
if [[ -e /usr/share/bigbluebutton/nginx/streaming.nginx ]]; then
    # Remove streaming.nginx file
    sudo rm /usr/share/bigbluebutton/nginx/streaming.nginx
    echo "File streaming.nginx removed successfully"
    
    # Restart Nginx
    sudo systemctl restart nginx
    echo "Nginx restarted successfully"
else
    echo "File streaming.nginx does not exist"
fi

# Check if bbb-streaming process Exists
if pm2 describe bbb-streaming &> /dev/null; then
    # Stop and remove existing bbb-streaming process
    if pm2 stop bbb-streaming && pm2 delete bbb-streaming; then
        echo "Existing bbb-streaming process stopped and removed successfully"
    else
        echo "Error: Failed to stop and remove existing bbb-streaming process"
        exit 1
    fi
fi

# Check if bundle-original folder exists
if [[  -d "/usr/share/meteor/bbb-html5-original" ]]; then

    # Delete copied bundle 
    if sudo rm -r /usr/share/meteor/bundle; then
        echo "Deleted copied bundle successfully"
    else
        echo "Error: deleting bundle"
        exit 1
    fi

    # Copy bundle to bundle-original folder
    sudo mv  /usr/share/meteor/bbb-html5-original /usr/share/meteor/bundle || { echo "Error: Failed to rename bundle"; exit 1; }

    # Set ownership of copied files to the current user
    sudo chown -R $current_user:$current_user /usr/share/meteor/bundle

    if sudo bbb-conf --restart; then
        echo "BigBlueButton restarted"
    else
        echo "Error: Failed to restart BigBlueButton"
        exit 1
    fi
else
    echo "bbb-html5-original folder does not exist. You have already uninstalled or bigbluebutton streaming is not installed."
fi
