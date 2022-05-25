# node-mongo-docker

1. Main purpose of this project is to build an image of node with the help of Dockerfile.
2. docker-compose file helps to make the mongo db and node align in one network.
3. So once we docker-compose up, then no need to worry about the db connections or any other stuff.
4. The imp point abt this project is that, the mongo url matters a lot. If we are making a connection from docker, then kindly use mongo instead of localhost.
5. Also for mongo container, mentioning of port is mandate.
