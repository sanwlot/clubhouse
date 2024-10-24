const pool = require("../db/pool")
const bcrypt = require("bcryptjs")
module.exports = {
  getSignUp: (req, res) => {
    res.render("sign-up", { user: req.user })
  },
  postSignUp: async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body
    try {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) return next(err)
        await pool.query(
          "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
          [first_name, last_name, email, hashedPassword]
        )
        res.redirect("/")
      })
    } catch (error) {
      res.send("can't register the user")
    }
  },
}
