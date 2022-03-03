# Clean-Node-API

## 100% test coverage repository

![image](https://user-images.githubusercontent.com/38021205/156672701-02618eff-219f-474c-86dd-925549cf68ee.png)

## Init Docker MOngoDB commands

`docker pull mongo`  
`docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=docker -e MONGO_INITDB_ROOT_PASSWORD=docker123 mongo`  
After this commands, your database is configured. If you want to run again your database, use:  
`docker start mongodb`  
