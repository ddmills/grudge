import config from 'config';
import jwt from 'jsonwebtoken';

export function sign(data) {
  return jwt.sign(data, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
  });
}

export function isValid(token) {
  return jwt.verify(token, config.jwt.secret);
}
