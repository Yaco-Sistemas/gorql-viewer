#!/bin/sh

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
