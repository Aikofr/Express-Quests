const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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

const verifyPassword = (req, res) => {
  const password = req.body.password;
  const hashedPassword = req.user.hashedPassword;
 
  bcrypt.compare(password, hashedPassword)
  .then((isVerified) => {
  if (isVerified) {
    const payload = { sub: req.user.id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    delete req.user.hashedPassword;
    res.send({ token, user: req.user, });

  } else {
    res.send('Mot de passe incorrect');
  }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Internal server error');
  });
 };


 const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
