const {Router} = require("express");
const userRouter = Router();
const addUser = require("../controllers/addUser");
const hashPassword = require("../../middleware/hashPassword");
const checkPassword = require("../../middleware/checkPassword");
const listAllUsers = require("../controllers/listAllUsers");
const login = require("../controllers/login");
const checkToken = require("../../middleware/checkToken");
const updateUser = require("../controllers/updateUser");
const deleteUser = require("../controllers/deleteUser");

userRouter.post("/addUser", hashPassword, addUser);
userRouter.get("/listAllUsers", checkToken, listAllUsers);
userRouter.post("/login", checkPassword, login);
userRouter.put("/updateUser", checkToken, updateUser);  
userRouter.delete("/deleteUser", deleteUser)

module.exports = userRouter;