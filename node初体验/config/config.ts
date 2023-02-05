const env = process.env.NODE_ENV || 'development'
const credentials = require(`../credentials.${env}.json`)
module.exports = { credentials }
export default {}
