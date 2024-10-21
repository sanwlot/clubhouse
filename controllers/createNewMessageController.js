const pool = require("../db/pool")

module.exports = {
  getCreateNewMessage: (req, res) => {
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
  },
  postCreateNewMessage: async (req, res) => {
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
  },
}
