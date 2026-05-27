const sql = require("mssql/msnodesqlv8");

const config = {
    connectionString:
        "Driver={ODBC Driver 17 for SQL Server};Server=LAPTOP-G38IPNK6\\SQLEXPRESS;Database=EmployeeDB;Trusted_Connection=Yes;"
};

sql.connect(config)
.then(() => {
    console.log("Database Connected");
})
.catch(err => {
    console.log(err);
});

module.exports = sql;