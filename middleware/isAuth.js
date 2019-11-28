const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const tokenvalue = req.get('Authorization');
    try {
      const decoded = jwt.verify(tokenvalue, '$-0123456789_abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE');
      if (!decoded) {
        return res.status(401).send({
          status: 401,
          message: 'request not authentified',
        });
      }
      req.id = decoded.id;
      return next();
    } catch (error) {
      return res.status(401).send({
        status: 401,
        message: 'request not authentified',
      });
    }
  };