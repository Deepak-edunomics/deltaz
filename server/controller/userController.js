const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Models
const User = require('../model/user')

//Config
const keys = require('../config/keys')


module.exports = {
    userRegister: async (req, res, next) => {
        try {
            let errors = {}
            const { name, email, password} = req.body;
            const user = await User.findOne({ email })
            if (user) {
                errors.email = "Email already exist"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await new User({
                name,
                email,
                password: hashedPassword
            })
            await newUser.save()
            const { _id } = newUser
            const payload = {
                _id, name, email
            }
            jwt.sign(
                payload,
                keys.secretKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        message: "New user created successfully",
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );
        }
        catch (err) {
            console.log("Error in userRegister", err.message)
            return res.status(400).json({ message: `Error in userRegister ${err.message}` })
        }
    },
    userLogin: async (req, res, next) => {
        try {
            let errors = {}
            const { email, password } = req.body;
            const user = await User.findOne({ email })
            if (!user) {
                errors.email = "Email doesnt not exist"
                return res.status(400).json(errors)
            }
            const isCorrect = await bcrypt.compare(password, user.password)
            if (!isCorrect) {
                errors.password = 'Invalid Credentials';
                return res.status(404).json(errors);
            }
            const { _id, name } = user
            const payload = {
                _id, name, email
            }
            jwt.sign(
                payload,
                keys.secretKey,
                { expiresIn: 7200 },
                (err, token) => {
                    res.json({
                        message: "User logged in successfully",
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );

        }
        catch (err) {
            console.log("Error in userLogin", err.message)
            return res.status(400).json({ message: `Error in userLogin ${err.message}` })
        }
    }
}


