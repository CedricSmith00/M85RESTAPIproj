require("dotenv").config();
const { Sequelize } = require("sequelize");

const connection = new Sequelize(process.env.MYSQL_URI);

try {
    connection.authenticate();
    console.log("Database connection successful.");
} catch (error) {
    console.error("unableto connect to the database:", error);
}

module.exports = connection;