const rateLimit = require('express-rate-limit');

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 20,
    message: 'Çok fazla talepte bulundunuz, Lütfen biraz sakin olunuz :D',
    statusCode: 429,
    headers: true,
    keyGenerator: (req) => req.ip,
    skip: (req, res) => req.user && req.user.isAdmin
});

module.exports = limiter;
