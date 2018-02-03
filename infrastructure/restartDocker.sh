docker stop pura_cozinha
docker rm pura_cozinha
docker run --name pura_cozinha -d -p 80:3000 --env-file env.list gstiebler/pura_cozinha