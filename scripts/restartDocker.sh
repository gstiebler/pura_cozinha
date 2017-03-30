docker stop $(docker ps -a -q)
docker run -p 80:80 --env-file ./env.list gstiebler/pura_cozinha
