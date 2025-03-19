import { connection, db } from "./db.functions.js";

export const buyer_signup = (req, res) => {
    if (!connection) {
        return res.status(500).send({ message: "Database connection failed" });
    }

    const { first_name, last_name, email, contact_no, address, city, state, nic, gender, acc_no, location, acres, compost, harvest } = req.body;

    if (!first_name || !last_name || !email || !contact_no || !address || !city || !state || !nic || !gender || !acc_no || !location || !acres || !compost || !harvest) {
        return res.status(400).send({ message: "All fields are required" });
    }

    const checkEmailQuery = 'SELECT email FROM registration WHERE email = ?';
    const checkNicQuery = 'SELECT nic FROM registration WHERE nic = ?';

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
                    INSERT INTO registration (
                        first_name, last_name, email, contact_no, address, 
                        city, state, nic, gender, acc_no, location, acres, compost, harvest
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

            const values = [
                first_name, last_name, email, contact_no, address,
                city, state, nic, gender, acc_no, location, acres, compost, harvest
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