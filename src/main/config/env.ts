export default {
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb://docker:docker123@localhost:27017/clean-node-api?authSource=admin',
  port: process.env.PORT || 3000
}
