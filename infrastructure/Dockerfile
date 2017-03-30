FROM node:7.7

WORKDIR /usr/src
RUN git clone https://9757d14fb19ca7959487542f9fdaaa993d1180e0:x-oauth-basic@github.com/gstiebler/pura_cozinha.git

WORKDIR /usr/src/pura_cozinha/scripts

RUN ./install.sh

EXPOSE 80 3000
CMD git clone https://9757d14fb19ca7959487542f9fdaaa993d1180e0:x-oauth-basic@github.com/gstiebler/pura_cozinha.git
CMD bash -C '/usr/src/pura_cozinha/scripts/start.sh'
