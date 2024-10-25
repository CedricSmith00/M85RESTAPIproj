require("dotenv").config();
const jwt = require("jsonwebtoken");

async function login(req, res) {
    try {
        const privateKey = process.env.JWT_SECRET_KEY;
        const expiratonTime = 60*60*24*2;
        const payload = {
            email: req.body.email,
            username: req.body.username
        }
        const options = {
            expiresIn: expiratonTime
        };
        const token = await jwt.sign(payload, privateKey, options);
        console.log(token);
        res.status(200).json({
            message: `user ${req.body.username} has successfully been logged in`,
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = login