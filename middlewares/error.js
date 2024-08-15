const logger = require('./logger')

module.exports = function(err, req, res, next) {
    logger.error(`Error: ${err.message}, Stack: ${err.stack}`)
    res.status(500).send("Server Hatasi")    
}
