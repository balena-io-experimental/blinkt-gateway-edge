#!/bin/bash

# Enable i2c
modprobe i2c-dev || true

# Special procedure invoked only on rpi3 revision
REV=`cat /proc/cmdline | awk -v RS=" " -F= '/boardrev/ { print $2 }'`
if [ "$REV" = "0xa02082" ]
  then
    if ! /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow -; then
        /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow - || true
    fi
fi
# Enable Bluetooth
hciconfig hci0 up || true

while true; do
    node /usr/src/app/index.js
done
