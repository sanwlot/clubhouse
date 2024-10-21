const pool = require("../db/pool")

module.exports = {
  getMembership: (req, res) => {
    res.render("membership", { user: req.user })
  },
  postMembership: async (req, res, next) => {
    const { secret } = req.body
    const { id } = req.user
    if (secret == "sylvia") {
      try {
        await pool.query("UPDATE users SET membership = 'pro' WHERE id = $1", [
          id,
        ])
        res.redirect("/")
      } catch (error) {
        next(error)
      }
    } else {
      res.send("Invalid Secret")
    }
  },
}
