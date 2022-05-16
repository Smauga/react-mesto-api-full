const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  try {
    const jwtScret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, jwtScret);
    } catch (err) {
      throw new AuthError('Необходима авторизация');
    }

    req.user = payload;
    return next();
  } catch (err) {
    return next(err);
  }
};
