FROM node:carbon

# Update
RUN apt-get update -y

# Install apt-transport-https for Yarn repository
RUN apt-get install apt-transport-https -y

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Update
RUN apt-get update -y

RUN apt-get install yarn

WORKDIR /usr/src
RUN git clone https://<github_oauth>@github.com/gstiebler/pura_cozinha.git

WORKDIR /usr/src/go_dental

# used for caching packages
RUN yarn
RUN yarn global add typescript

WORKDIR /usr/src/pura_cozinha/infrastructure
CMD ./startServer.sh
