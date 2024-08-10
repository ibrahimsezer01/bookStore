const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Token bulunamadi.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SUPER_SECRET_KEY');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Geçersiz token.');
  }
}

module.exports = auth;
