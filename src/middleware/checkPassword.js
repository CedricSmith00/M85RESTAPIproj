const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require("../db/models/userModel");

async function checkPassword(req, res, next) {
    try {
        const userDetails = await User.findOne({
            where: {
                [Op.or]: [
                    { username: req.body.username },
                    { email: req.body.email }
                ]
            }
        });

        if(!userDetails) {
            res.status(404).send("username/email does not match password");
            return;
        }

        const plainTextPassword = req.body.password;
        const hashedPassword = userDetails.password;
        const output = await bcrypt.compare(plainTextPassword, hashedPassword);
        console.log("Password comparison result:", output);

        if(!output) {
            res.status(404).send("username/email does not match password");
            return;
        }
        req.body.email = userDetails.dataValues.email;
        req.body.username = userDetails.dataValues.username;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = checkPassword;