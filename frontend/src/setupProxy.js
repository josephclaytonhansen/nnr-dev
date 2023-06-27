const proxy = require('http-proxy-middleware')
const constants = require('./constants')
module.exports = function(app) {
    app.use(proxy('/api', { target: constants.BASE_URL}))
}