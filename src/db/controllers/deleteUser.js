const User = require("../models/userModel");

async function deleteUser(req, res) {
    try {
        const { user_id } = req.body;
        const deletedUser = await User.destroy({ where: { user_id } });

        if (deletedUser) {
            return res.status(200).json({ message: "User has been successfully deleted"})
        } else {
            return res.status(404).json({ message: "User could not be found"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error deleted user"})
    }
}

module.exports = deleteUser