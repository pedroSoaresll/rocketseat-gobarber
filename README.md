# Container com postgres
```docker
sudo docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```

# Container com mongo
```docker
sudo docker run --name mongobarber -p 27017:27017 -d -t mongo
```

# Container com redis
```docker
sudo docker run --name redisbarber -p 6739:6739 -d -t redis:alpine
```
