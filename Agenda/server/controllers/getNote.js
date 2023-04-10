const jwt = require('jsonwebtoken')
const getNotes = (req, res) => {
    if (!req.cookies.logUser) return res.json({ status: 0, message: 'Please login Again!' })
    const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, id) => {
        if (err) return null; else return id
    })
    if (user == null) return res.json({ status: 0 })
    db.query('SELECT * from notes WHERE user_id = ?', [user.id], (err, result) => {
        if (err) throw err
        return res.json({ status: 0, message: result })
    })
}
module.exports = getNotes