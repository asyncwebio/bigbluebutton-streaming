FROM ubuntu:bionic
# Set a variable for the install location.
ARG WORK_DIR=/usr/src/app

# Set the timezone.
ENV TZ=UTC

ENV DEBIAN_FRONTEND=noninteractive

# Install wget.
RUN apt-get update && apt-get install -y wget gnupg


# Make the directory and set as working.
RUN mkdir -p $WORK_DIR
WORKDIR $WORK_DIR

ARG BUILD_PACKAGES="build-essential curl git"
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
ARG DEV_PACKAGES="libpq-dev libsqlite3-dev libyaml-dev zlib1g-dev nodejs yarn tzdata"
ARG STREAMING_PACKAGE="curl gnupg2 psmisc   make g++ libgbm-dev ffmpeg gconf-service libasound2 libatk1.0-0 libc6 libcairo2 \
    libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
    libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
    libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
    libxtst6 ca-certificates fonts-liberation libappindicator1  libnss3 \
    lsb-release xdg-utils wget xvfb fonts-noto \
    dbus-x11 libasound2 fluxbox  libasound2-plugins alsa-utils  alsa-oss pulseaudio pulseaudio-utils \
    xvfb pulseaudio-equalizer "


# Set the Chrome repo.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable


# install -y app dependencies.
RUN apt update \
    && apt upgrade -y \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt install -y $BUILD_PACKAGES $DEV_PACKAGES $STREAMING_PACKAGE

RUN pulseaudio --version


# Install Node.js and npm.
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash \
    && apt-get install -y nodejs

# installing project files.
COPY package.* .

RUN npm install

COPY . .

RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]
