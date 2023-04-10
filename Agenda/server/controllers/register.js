const bcrypt = require('bcryptjs')
const { raw } = require('mysql')
const db = require('../routes/db-config')
const register = async (req, res) => {
    const { user, pass: rawPass } = req.body
    db.query('SELECT username FROM users WHERE username = ?', [user], (stop, chkuser) => {
        if (stop) throw stop
        if (chkuser[0]) return res.json({ status: 0, message: 'User already exists with the username!' })
    })
    const pass = await bcrypt.hash(rawPass, 10)
    db.query('INSERT INTO users SET ?', { user, pass }, (err, result) => {
        if (err) throw err
        return res.json({ status: 1, message: 'User has been registered!' })
    })
}
module.exports = register