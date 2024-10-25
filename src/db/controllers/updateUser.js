const express = require("express");
const User = require("../models/userModel");
const checkToken = require("../../middleware/checkToken");


async function updateUser(req, res) {
    const { username } = req.body;
    const { user_id } = req.user;

    try {
        if (typeof username !== 'string') {
            throw new Error('Username must be a string');
        }

        const [updated] = await User.update(
            { username }, 
            { where: { user_id} }
        );

        if (updated) {
            const updatedUser = await User.findOne({ where: { user_id } });
            return res.status(200).json({ user: updatedUser });
        }
        
        return res.status(404).json({ message: "User not found"});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = updateUser