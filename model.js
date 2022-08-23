const mysql = require('mysql2');

require('dotenv').config();

var dbConnection = mysql.createPool({
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
});

module.exports = {
    dbExecution: async function (query, argslist) {
        console.log("db connection : ", dbConnection);
        console.log("db url's : ", process.env.DATABASE_NAME, process.env.DATABASE_HOST, process.env.DATABASE_USERNAME, process.env.DATABASE_PORT, process.env.DATABASE_PASSWORD);
        return new Promise(function (resolve, reject) {
            dbConnection.getConnection(function(error, connection){
                if(error) {
                   console.log(`Error in creating Database connection : ${JSON.stringify(error)}`);
                   return reject(undefined);
                }
                connection.query(query, argslist, function (error, result, fields) {
                    connection.release();
                    if (error) {
                       console.log(`Error in executing the query : ${JSON.stringify(error)}`);
                       return reject(undefined);
                    } else if (result) {
                        console.log("Query Executed successfully");
                       return resolve(result);
                    }
                });
            });
        });
    },
};