cmd_Release/fibers.node := ln -f "Release/obj.target/fibers.node" "Release/fibers.node" 2>/dev/null || (rm -rf "Release/fibers.node" && cp -af "Release/obj.target/fibers.node" "Release/fibers.node")
