const { MongoClient } = require('mongodb')
const credentials = require(`../credentials.${process.env.NODE_ENV}.json`)
const client = new MongoClient(credentials.mongo.connectianString)
module.exports = client
export {}
