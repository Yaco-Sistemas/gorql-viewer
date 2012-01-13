#!/bin/sh

case $1 in
    start)
        forever start app.js
        ;;
    stop)
        forever stop app.js
        ;;
    restart)
        forever restart app.js
        ;;
    status)
        forever list
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart|status}"
        exit 1
esac
