import mongodb = require('mongodb')
import credentials = require('../config/config')
const { MongoClient } = mongodb
const client = new MongoClient(credentials.mongo.connectianString)
export = client
