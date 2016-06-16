#!/bin/sh

echo "This program will clean the messages over 2 hours ago."

num=1;

while [ "$num" != 0 ]
do
    sleep 1
    php ~/HttpServer/code/deamon.php
done
