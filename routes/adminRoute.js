const { Router } = require("express")
const { isAuthenticated } = require("../passportConfig")
const pool = require("../db/pool")
const adminRouter = Router()

adminRouter.get("/", isAuthenticated, (req, res) => {
  res.render("admin", { user: req.user })
})
adminRouter.post("/", isAuthenticated, async (req, res, next) => {
  const { secret } = req.body
  const { id } = req.user
  if (secret == "manju") {
    try {
      await pool.query("UPDATE users SET admin = TRUE WHERE id = $1", [id])
      res.redirect("/")
    } catch (error) {
      next(error)
    }
  } else {
    res.send("Invalid Secret")
  }
})

module.exports = adminRouter
