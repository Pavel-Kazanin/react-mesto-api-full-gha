const jwt = require('jsonwebtoken');
const UnauthorizeError = require('../errors/unauthorize-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie || !cookie.startsWith('token=')) {
    return next(new UnauthorizeError('Необходима авторизация'));
  }

  const token = cookie.replace('token=', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new UnauthorizeError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
