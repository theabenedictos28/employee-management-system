const sql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true
    }
};

sql.connect(config)
.then(() => {
    console.log("Database Connected");
})
.catch(err => {
    console.log(err);
});

module.exports = sql;