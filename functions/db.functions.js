import mysql from 'mysql';
export let connection = false;

export const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "database"
});

export const checkConnection = () => {
    return db.connect((err, res) => {
        if (err) {
            connection = false
            throw err
        } else {
            connection = true
            console.log("Database connected!")
        }
    })
}