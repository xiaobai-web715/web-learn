// import credentials = require(`../credentials.${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.json`)
const credentialsPath = `../credentials.${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.json`
const requireFunc = require
const credentials = requireFunc(credentialsPath)
// module.exports = { credentials }
export = credentials
