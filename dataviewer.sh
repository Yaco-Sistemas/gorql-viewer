#!/bin/sh

case $1 in
    start)
        su dataviewer -c "forever start /opt/dataviewer/app.js"
        ;;
    stop)
        su dataviewer -c "forever stop /opt/dataviewer/app.js"
        ;;
    restart)
        su dataviewer -c "forever restart /opt/dataviewer/app.js"
        ;;
    status)
        su dataviewer -c "forever list"
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart|status}"
        exit 1
esac
