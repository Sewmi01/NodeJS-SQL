import { buyer_login } from "./buyer.functions.js";
import { connection, db } from "./db.functions.js"

export const user_login = (req, res) => {
    if (!connection) throw console.error("No SQL connection");

    const { email, password } = req.body;

    db.query(`SELECT email FROM users WHERE email = '${email}' and password = '${password}'`, function(error, result, fields) {
        if (error) throw error;
        if (result.length > 0) {
            res.send({
                code: 200,
                success: true,
                result: result
            })
        } else {
            buyer_login(req, res);
        }
    })

}

export const user_signup = (req, res) => {
    if (!connection) {
        return res.status(500).send({ message: "Database connection failed" });
    }

    const { first_name, last_name, email, contact_no, address, city, state, nic, gender, username, password } = req.body;

    if (!first_name || !last_name || !email || !contact_no || !address || !city || !state || !nic || !gender || !username || !password) {
        return res.status(400).send({ message: "All fields are required" });
    }

    const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';
    const checkNicQuery = 'SELECT nic FROM users WHERE nic = ?';

    db.query(checkEmailQuery, [email], (error, emailResult) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send({ message: 'Server error' });
        }

        if (emailResult.length > 0) {
            return res.status(409).send({ message: 'Email is already in use' });
        }

        db.query(checkNicQuery, [nic], (error, nicResult) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).send({ message: 'Server error' });
            }

            if (nicResult.length > 0) {
                return res.status(409).send({ message: 'NIC is already in use' });
            }

            const insertQuery = `
                    INSERT INTO users (
                        first_name, last_name, email, contact_no, address, city, state, nic, gender, username, password
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

            const values = [
                first_name, last_name, email, contact_no, address, city, state, nic, gender, username, password
            ];

            db.query(insertQuery, values, (error, result) => {
                if (error) {
                    console.error('Database error:', error);
                    return res.status(500).send({ message: 'Server error' });
                }

                res.status(201).send({
                    code: 201,
                    success: true,
                    message: 'User registered successfully',
                    userId: result.insertId
                });
            });
        });
    });
};