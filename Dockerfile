FROM ubuntu:16.04
MAINTAINER yhayashi

# For proxy
#ARG http_proxy
#ARG https_proxy
#ARG password
#
#ENV http_proxy ${http_proxy}
#ENV https_proxy ${https_proxy}
ENV password hubot

# apt install
RUN apt update
RUN apt install -y --no-install-recommends \
        curl git locales \
        sudo vim \
        npm nodejs \
        && apt clean && rm -rf /var/lib/apt/lists/*

# Set locale
RUN locale-gen en_US.UTF-8
RUN update-locale LANG=en_US.UTF-8 LANGUAGE=en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# npm install
#RUN npm config set proxy ${http_proxy}
#RUN npm config set https-proxy ${https_proxy}
#RUN npm config set strict-ssl false

RUN npm install -g n
RUN n --insecure 8.17.0  # ver. Carbon (LTS)

RUN npm install -g hubot yo generator-hubot forever typescript

#RUN npm config delete proxy
#RUN npm config delete https-proxy

# Deploy
RUN useradd -m -s /bin/bash hubot
RUN usermod -aG sudo hubot
RUN printf hubot:${password} | chpasswd

USER hubot
WORKDIR /home/hubot

RUN mkdir workspace
WORKDIR workspace

#RUN npm config set proxy ${http_proxy}
#RUN npm config set https-proxy ${https_proxy}
#RUN npm config set strict-ssl false

RUN yo hubot --owner "hubot" --name "bot" --description "hubot" --adapter campfire
RUN npm install --save @types/node @types/hubot

COPY files/entrypoint.sh /
COPY files/env.ini .
COPY files/update.sh .
COPY files/start.sh .
COPY files/restart.sh .
COPY files/external-scripts.json .
RUN rm hubot-scripts.json scripts/example.coffee

#RUN npm config delete proxy
#RUN npm config delete https-proxy
#ENV http_proxy ""
#ENV https_proxy ""

ENTRYPOINT ["/entrypoint.sh"]
