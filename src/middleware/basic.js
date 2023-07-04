const base64 = require('base-64');
const Users = require('../models/users-model');

module.exports = async function basicAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  const basicHeaderParts = req.headers.authorization.split(' ');
  const encodedString = basicHeaderParts.pop();
  const decodedString = base64.decode(encodedString);
  const [username, password] = decodedString.split(':');

  try {
    const user = await Users.findOne({ where: { username: username } });
    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    const valid = await user.authenticate(password);
    if (valid) {
      req.user = user;
      next();
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (error) {
    next(error);
  }
};
