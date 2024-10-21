const express = require("express")
const app = express()
const signUpRouter = require("./routes/signUpRoute")
const joinMembershipRouter = require("./routes/joinMembershipRoute")
const indexRouter = require("./routes/indexRoute")
const logInRouter = require("./routes/logInRoute")
const session = require("express-session")
const passport = require("passport")
const { initializingPassport, isAuthenticated } = require("./passportConfig")
const pool = require("./db/pool")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

initializingPassport(passport)
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }))
app.use(passport.session())

app.use("/", indexRouter)
app.use("/sign-up", signUpRouter)
app.use("/log-in", logInRouter)
app.use("/join-membership", joinMembershipRouter)

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) next(err)
    res.redirect("/")
  })
})
app.get("/create-new-message", isAuthenticated, (req, res) => {
  res.send(`
      <form method="POST"> 
        <h1>Create new message</h1>
        <input name="title" type="text" placeholder="title" /> 
        <br/>
        <textarea name="message" placeholder="enter message" required></textarea>
        <br />
        <button>Create</button>
      </form>
    `)
})
app.post("/create-new-message", isAuthenticated, async (req, res) => {
  const { message, title } = req.body
  try {
    // Inserting the message and user ID into the messages table
    await pool.query(
      "INSERT INTO messages (user_id, title, message, created_at) VALUES ($1, $2, $3, NOW())",
      [req.user.id, title, message]
    )
    res.redirect("/") // Redirect or respond after insertion
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred while creating the message.")
  }
})
app.listen(8090)
