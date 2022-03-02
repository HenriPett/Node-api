# Clean-Node-API

## 100% test coverage repository

![image](https://user-images.githubusercontent.com/38021205/155697253-2f0881e2-d6e3-4c70-9c6d-66d9b729f495.png)

## Init Docker MOngoDB commands

`docker pull mongo`  
`docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=docker -e MONGO_INITDB_ROOT_PASSWORD=docker123 mongo`  
After this commands, your database is configured. If you want to run again your database, use:  
`docker start mongodb`  
