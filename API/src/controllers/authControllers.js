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
                .query("INSERT INTO users(UserName, Email, Password) VALUES(@username, @email, @hashedPassword)");
            res.status(201).json({ message: 'User created successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        sql.close();
    }
}

export const login = async(req, res) => {
    const { username, password } = req.body;

    let pool = await sql.connect(config.sql);
    const userResult = await pool.request()
        .input("username", sql.VarChar, username)
        .query("select * from users where UserName = @username");
    const user = userResult.recordset[0];

    if (!user) {
        res.status(401).json({ error: "User Doesn't Exist" });
    } else if (user) {
        if (!bcrypt.compareSync(password, user.Password)) {

            res.status(401).json({ error: 'Wrong Credentials'});
        } else {
            let token = `JWT ${jwt.sign({ email: user.Email, username: user.UserName, id: user.Id }, `${process.env.JWT_SECRET}`)}`;
            const { id, username, email } = user;
            return res.json({ id: id, username: user.UserName, email: user.Email, token: token });
        }
    }
}


export const updatePassword = async(req, res) =>{
    const { email, username, confirmPassword } = req.body;
    const hashedPassword = bcrypt.hashSync(confirmPassword, 10);
    
    try {
        let pool = await sql.connect(config.sql)

        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE UserName = @username AND Email = @email');
    
        const user = result.recordset[0];
        if (user) { 
            await pool.request()
                .input('username', sql.VarChar, username)
                .input('hashedPassword', sql.VarChar, hashedPassword)
                .query('UPDATE Users SET Password = @hashedPassword WHERE UserName = @username');
            res.status(200).json({ Message: 'Password Updated successfully' });

        } else{
            res.status(404).json({ Error: "User Doesn't Exist" });

        }
      
    } catch (error) {

        res.status(500).json({ Error: error.message });
    } finally {

        sql.close();
    }

};
