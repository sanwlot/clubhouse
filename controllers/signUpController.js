const pool = require("../db/pool")
const bcrypt = require("bcryptjs")
module.exports = {
  getSignUp: (req, res) => {
    res.send(`
            <form method="POST"> 
                <h1>Sign up</h1>
                <input type="text" placeholder="first name" name="first_name" required /> <br>
                <input type="text" placeholder="last name" name="last_name" required /> <br>
                <input type="email" placeholder="email" name="email" required /> <br>
                <input type="password" placeholder="password" name="password" required /> <br>
                <button>Sign up</button>
            </form>
        `)
  },
  postSignUp: async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
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
