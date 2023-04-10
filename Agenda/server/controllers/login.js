const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const login = async (req, res) => {
    const { user, pass } = req.body
    db.query('SELECT * user FROM users WHERE user = ?', [user], async (stop, chkuser) => {
        if (stop) throw stop
        if (!chkuser[0] || !await bcrypt.compare(pass, chkuser[0].pass)) return res.json(
            { status: 0, message: 'User is not registered!' })
        const token = jwt.sign({ id: chkuser[0].id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        })
        const cookieOption = {
            expiresIn: new Date(Date.now() * process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie('logUser', token, cookieOption)
        return res.json({ status: 1, message: 'User has been Logged in!' })
    })
}
module.exports = login