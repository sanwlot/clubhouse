const pool = require("../db/pool")

module.exports = {
  getLogin: (req, res) => {
    res.render("login", { user: req.user })
  },
}
