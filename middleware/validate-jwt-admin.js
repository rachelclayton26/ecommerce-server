const jwt = require('jsonwebtoken');
const { AdminModel } = require('../models');

const validateJWTAdmin = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    const { authorization } = req.headers;
    const payload = authorization ? jwt.verify(authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization, process.env.JWT_SECRET): undefined;
    if (payload) {
      AdminModel.findOne({
        where: {
          id: payload.id
        }
      })
      .then(admin => {
        req.admin = admin;
        next();
<<<<<<< HEAD
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        const {authorization} = req.headers;
        const payload = authorization ? jwt.verify(
            authorization.includes("Bearer")
            ? authorization.split("")[1]
            : authorization,
            process.env.JWT_SECRET
        )
        : undefined;

        if (payload) {
            let foundAdmin = await AdminModel.findOne({
                where: {
                    id: payload.id
                }
            });

            if (foundAdmin) {
                req.user = foundAdmin;
                next();
            } else {
                res.status(400).send({message: "Not Authorized"});
            }
        } else {
            res.status(401).send({message: "Invalid token"});
        }  
=======
      }).catch(err => {
        console.error(err)
        next()
      });
>>>>>>> 14bbdef428bed03115039fe98e188754f5915de2
    } else {
      res.status(401).json({
        message: 'Not allowed'
      });
    }
  } else {
    res.status(401).json({
      message: 'Not allowed 2'
    });
  }
}

module.exports = validateJWTAdmin;