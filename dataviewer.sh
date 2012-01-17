#!/bin/sh

case $1 in
    start)
        su dataviewer -c "/opt/dataviewer/node_modules/forever/bin/forever start /opt/dataviewer/app.js" --shell=/bin/sh
        ;;
    stop)
        su dataviewer -c "/opt/dataviewer/node_modules/forever/bin/forever stop /opt/dataviewer/app.js" --shell=/bin/sh
        ;;
    restart)
        su dataviewer -c "/opt/dataviewer/node_modules/forever/bin/forever restart /opt/dataviewer/app.js" --shell=/bin/sh
        ;;
    status)
        su dataviewer -c "/opt/dataviewer/node_modules/forever/bin/forever list" --shell=/bin/sh
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart|status}"
        exit 1
esac
