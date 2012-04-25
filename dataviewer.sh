#!/bin/sh

case $1 in
    start)
        su gorql -c "NODE_ENV=production /opt/gorql-viewer/node_modules/forever/bin/forever start /opt/gorql-viewer/app.js" --shell=/bin/sh
        ;;
    stop)
        su gorql -c "/opt/gorql-viewer/node_modules/forever/bin/forever stop /opt/gorql-viewer/app.js" --shell=/bin/sh
        ;;
    restart)
        su gorql -c "NODE_ENV=production /opt/gorql-viewer/node_modules/forever/bin/forever restart /opt/gorql-viewer/app.js" --shell=/bin/sh
        ;;
    status)
        su gorql -c "/opt/gorql-viewer/node_modules/forever/bin/forever list" --shell=/bin/sh
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart|status}"
        exit 1
esac
