#!/bin/bash
set -e

# Check if the user is root
if [[ $EUID -eq 0 ]]; then
    echo "Error: This script should not be run as root."
    exit 1
fi

# Check if bundle-original folder is exists
    if [[  -d "/usr/share/meteor/bbb-html5-original" ]]; then

        #Delete copied bundle 
       if sudo rm -r /usr/share/meteor/bundle; then
         echo "Deleted copied bundle successfully"
       else
         echo "Error:deleting bundle"
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
        echo "bigbluebutton-html5 folder is not exist,You already uninstalled, or bigbluebutton streaming is not installed."
    fi