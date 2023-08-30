git pull origin main
docker build -t bot-express .
docker stop bot-express
docker rm bot-express
docker run -p 2222:2222 --name bot-express -d --restart=always bot-express