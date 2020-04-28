#!/bin/bash
source env.ini
./update.sh
forever start -c ./node_modules/coffeescript/bin/coffee -a -l `pwd`/log/hubot.log node_modules/.bin/hubot
