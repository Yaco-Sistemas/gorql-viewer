#!/bin/sh

# chkconfig: 2345 99 01
# description: The GORQL Viewer server is a node.js application and it renders \
#              SPARQL queries results.
# config: /etc/gorql-viewer/settings.js
#
### BEGIN INIT INFO
# Required-Start: $local_fs $network
# Required-Stop: $local_fs $network
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: Start and stop the GORQL Viewer component.
# Description: The GORQL Viewer server is a node.js application and it renders
#              SPARQL queries results.
### END INIT INFO

case $1 in
    start)
        su gorql -c "NODE_ENV=production forever start /opt/gorql-viewer/app.js" --shell=/bin/sh
        ;;
    stop)
        su gorql -c "forever stop /opt/gorql-viewer/app.js" --shell=/bin/sh
        ;;
    restart)
        su gorql -c "NODE_ENV=production forever restart /opt/gorql-viewer/app.js" --shell=/bin/sh
        ;;
    status)
        su gorql -c "forever list" --shell=/bin/sh
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart|status}"
        exit 1
esac
