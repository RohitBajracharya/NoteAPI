const userModel = require("../models/user");
const dotenv = require("dotenv")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;

const doesUserExist = async (email) => {
    try {
        const user = await userModel.findOne({ email });

    } catch (error) {
        console.log("Error: " + error);
        throw error;
    }
    if (user) return true
    return false
}

const findExistingUserByEmail = async (email) => {
    try {
        return await userModel.findOne({ email });
    } catch (error) {
        console.log("Error : " + error)
        throw error;
    }
}

const getHashedPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10)
    } catch (error) {
        console.log("Error : " + error)
        throw error;
    }

}

const createNewUser = async (email, hashedPassword, username) => {
    try {
        return result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

    } catch (error) {
        console.log("Error : " + error)
        throw error;
    }

}

const generateToken = (user) => {
    try {
        return jwt.sign({ email: user.email, id: user._id }, SECRET_KEY)
    } catch (error) {
        console.log("Error : " + error)
        throw error;
    }

}

const comparePassword = async (currentPassword, dbPassword) => {
    try {
        return await bcrypt.compare(currentPassword, dbPassword);
    } catch (error) {
        console.log("Error : " + error)
        throw error;
    }
}

module.exports = {
    doesUserExist,
    findExistingUserByEmail,
    getHashedPassword,
    createNewUser,
    generateToken,
    comparePassword,
}