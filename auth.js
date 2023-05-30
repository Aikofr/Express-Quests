const bcrypt = require('bcrypt');

const hashPassword = (req, res, next) => {
  const password = req.body.hashedPassword;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      req.body.hashedPassword = hash;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
};

module.exports = {
  hashPassword,
};
