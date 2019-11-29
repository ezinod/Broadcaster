const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const tokenvalue = req.header('Authorization');
    try {
      const decoded = jwt.verify(tokenvalue, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE');
      if (!decoded) {
        return res.status(401).send({
          status: 401,
          message: 'you are not logged in!',
        });
      }
      req.id = decoded.id;
      return next();
    } catch (error) {
      return res.status(401).send({
        status: 401,
        error: error,
      });
    }
  };

  // '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE'