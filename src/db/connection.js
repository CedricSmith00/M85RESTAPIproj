const connection = new Sequelize(process.env.MYSLQ_URI);

try {
    connection.authenticate();
    console.log("Database connection successful.");
} catch (error) {
    console.error("unableto connect to the database:", error);
}

module.exports = connection;