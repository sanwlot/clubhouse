const express = require("express")
const app = express()
const signUpRouter = require("./routes/signUpRoute")
const joinMembershipRouter = require("./routes/joinMembershipRoute")
const indexRouter = require("./routes/indexRoute")
const logInRouter = require("./routes/logInRoute")
const session = require("express-session")
const passport = require("passport")
const { initializingPassport } = require("./passportConfig")
const createNewMessageRouter = require("./routes/createNewMessageRoute")
const logoutRouter = require("./routes/logoutRoute")
const adminRouter = require("./routes/adminRoute")
const pool = require("./db/pool")

app.set("view engine", "ejs")
app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

initializingPassport(passport)
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }))
app.use(passport.session())

app.use("/", indexRouter)
app.use("/sign-up", signUpRouter)
app.use("/log-in", logInRouter)
app.use("/join-membership", joinMembershipRouter)
app.use("/create-new-message", createNewMessageRouter)
app.use("/log-out", logoutRouter)
app.use("/admin", adminRouter)

app.post("/delete-message/:id", async (req, res) => {
  const messageId = req.params.id // Get the message ID from the URL

  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId])
    res.redirect("/") // Redirect to the homepage after deleting
  } catch (error) {
    console.error(error)
    res.status(500).send("Error deleting the message.")
  }
})

app.listen(8010)
