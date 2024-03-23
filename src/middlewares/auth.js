const dotenv = require("dotenv")
const jwt = require("jsonwebtoken");

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            console.log(SECRET_KEY);
            token = token.split(" ")[1]
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
            next();
        } else {
            res.status(401).json({ message: "Unauthorized User" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized User" })
    }
}

module.exports = auth;