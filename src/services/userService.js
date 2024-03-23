const userModel = require("../models/user");
const dotenv = require("dotenv")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;

const doesUserExist = async (email) => {
    const user = await userModel.findOne({ email });
    if (user) return true
    return false
}

const findExistingUserByEmail = async (email) => {
    return await userModel.findOne({ email });
}

const getHashedPassword = async (password) => {
    return await bcrypt.hash(password, 10)

}

const createNewUser = async (email, hashedPassword, username) => {
    return result = await userModel.create({
        email: email,
        password: hashedPassword,
        username: username
    });

}

const generateToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, SECRET_KEY)

}

const comparePassword = async (currentPassword, dbPassword) => {
    return await bcrypt.compare(currentPassword, dbPassword);
}

module.exports = {
    doesUserExist,
    findExistingUserByEmail,
    getHashedPassword,
    createNewUser,
    generateToken,
    comparePassword,
}