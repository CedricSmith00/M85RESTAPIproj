const cors = require("cors");
const express =require("express");
const app = express();
const hashPassword = require("./middleware/hashPassword");
const User = require("./db/models/uuserModel");
const userRouter = require("./db/routes/userRouter");
require("dotenv").config();

app.use(express.json());
app.use(cors());

function syncTables() {
    userRouter.sync({alter:true})
};

const port = process.env.PORT || 5001;

app.use(userRouter)

app.get("/health", (req,res) => res.status(200).send("API is healthy"));

syncTables();

app.listen(port, () => {console.log(`Server is running on port ${port}`)})