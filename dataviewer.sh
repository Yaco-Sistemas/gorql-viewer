#!/bin/sh

case $1 in
    start)
        su dataviewer -c "forever start /opt/dataviewer/app.js" --shell=/bin/sh
        ;;
    stop)
        su dataviewer -c "forever stop /opt/dataviewer/app.js" --shell=/bin/sh
        ;;
    restart)
        su dataviewer -c "forever restart /opt/dataviewer/app.js" --shell=/bin/sh
        ;;
    status)
        su dataviewer -c "forever list" --shell=/bin/sh
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart|status}"
        exit 1
esac
