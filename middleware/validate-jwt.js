const jwt = require("jsonwebtoken");
const {UserModel} = require('../models');

const validateJWT = async(req, res, next) => {
    if (req.method == "OPTIONS"){
        next();
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
            let foundUser = await UserModel.findOne({
                where: {
                    id: payload.id
                }
            });

            if (foundUser) {
                req.user = foundUser;
                next();
            } else {                           //Alec
                res.status(400).send({message: "nuh-uh, not authorized"});
            }
        } else {
            res.status(401).send({message: "Invalid token"});
        }  
    } else {                            //Alec
        res.status(403).send({message: "verboten"});
    }
};

module.exports = validateJWT;