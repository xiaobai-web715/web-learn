const env = process.env.NODE_ENV || 'development'
const credentials = require(`../.credentilas.${env}.json`)
module.exports = { credentials }
