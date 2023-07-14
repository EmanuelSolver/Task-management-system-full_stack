import sql from 'mssql';
import config from '../db/config.js'

export const getUsers = async (req, res) => {

    try {
        let pool = await sql.connect(config.sql);

          //establish a connection to the database
        const result = await pool.request()        // make a request to the database
            .query("SELECT * FROM Users");     // query the employees table in the database

        !result.recordset[0] ? res.status(404).json({ message: 'Record not found' }) // check if there is a record in the table
            : res.status(200).json(result.recordset); // return the result

    } catch (error) {

        res.status(201).json({ error: error.message });
    } finally {

         //sql.close(); // Close the SQL connection
    }
};