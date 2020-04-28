#!/bin/bash
docker image ls | grep hubot 2>&1 >/dev/null
if [ $? -ne 0 ]; then
  docker build -t hubot:latest .
fi

docker rm -f hubot
docker run -itd -p 18080:8080 -v `pwd`/scripts:/home/hubot/workspace/tscripts -v `pwd`/log:/home/hubot/workspace/log --name hubot hubot
#docker run -itd -p 18080:8080 -v `pwd`/scripts:/home/hubot/workspace/tscripts -v `pwd`/log:/home/hubot/workspace/log --name hubot hubot /bin/bash
docker exec -it hubot /bin/bash
