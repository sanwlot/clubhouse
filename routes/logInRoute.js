const { Router } = require("express")
const { getLogin } = require("../controllers/logInController")
const logInRouter = Router()
const passport = require("passport")

logInRouter.get("/", getLogin)
logInRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
)

module.exports = logInRouter
