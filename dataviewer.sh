#!/bin/sh

case $1 in
    start)
        forever start /opt/dataviewer/app.js
        ;;
    stop)
        forever stop /opt/dataviewer/app.js
        ;;
    restart)
        forever restart /opt/dataviewer/app.js
        ;;
    status)
        forever list
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart|status}"
        exit 1
esac
