const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../db/models/userModel");

async function checkToken(req, res, next) {
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = req.header("Authorization")?.replace("Bearer ", "").trim();
        if (!token) {
            return res.status(401).json({ message: "Access Denied: No token provided" });
        }
        console.log("Token:", token);
        const decodedToken = jwt.verify(token, secretKey);
        console.log(decodedToken);
        const username = decodedToken.username;
        const findResponse = await User.findOne({ where: { username: username } });

        if (!findResponse) {
            throw new Error("User no longer in the database. Access denied.");
        } else {
            req.user = {
                user_id: findResponse.user_id,
                username: username,
                email: decodedToken.email
            };
            console.log("req.user set:", req.user);
            next();
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token has expired" });
        }
        
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = checkToken;
