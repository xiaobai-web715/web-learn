import credentials = require(`../credentials.${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.json`)
// module.exports = { credentials }
export = { credentials }
