const { findExistingUserByEmail, createNewUser, getHashedPassword, comparePassword, generateToken, doesUserExist } = require("../services/userService");



const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await doesUserExist(email)
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await getHashedPassword(password);
        const result = createNewUser(email, hashedPassword, username);
        const token = generateToken(result);
        res.status(201).json({ user: result, token: token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await doesUserExist(email)
        if (!userExist) {
            return res.status(404).json({ message: "User doesn't exist" })
        }
        const existingUser = await findExistingUserByEmail(email);
        const matchPassword = await comparePassword(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const token = generateToken(existingUser);
        res.status(201).json({ user: existingUser, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { signUp, signIn }