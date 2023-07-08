import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}


export const register = async (req, res) => {
    const { username, confirmPassword, email } = req.body;
    const hashedPassword = bcrypt.hashSync(confirmPassword, 10);
 
    try {
        let pool = await sql.connect(config.sql);
        const userResult = await pool.request()
            .input("username", sql.VarChar, username)
            .input("email", sql.VarChar, email)
            .query("select * from users where userName = @username or email = @email");
        const user = userResult.recordset[0];
        if (user) {
            res.status(401).json({ error: 'User already exists' });
        } else {
            await pool.request()
                .input("username", sql.VarChar, username)
                .input("hashedPassword", sql.VarChar, hashedPassword)
                .input("email", sql.VarChar, email)
                .query("insert into users(UserName, Email, Password) values (@username, @hashedPassword, @email)");
            res.status(201).json({ message: 'User created successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        sql.close();
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    let pool = await sql.connect(config.sql);
    const userResult = await pool.request()
        .input("username", sql.VarChar, username)
        .query("select * from users where UserName = @username");
    const user = userResult.recordset[0];

    if (!user) {
        res.status(401).json({ error: 'Authentication failed. User not found.' });
    } else if (user) {
        if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ error: 'Authentication failed. Wrong password' });
        } else {
            let token = `JWT ${jwt.sign({ email: user.email, username: user.userName, id: user.Id }, `${process.env.JWT_SECRET}`)}`;
            const { id, username, email } = user;
            return res.json({ id: id, username: username, email: email, token: token });
        }
    }
}