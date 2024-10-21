const pool = require("../db/pool")

module.exports = {
  getIndex: async (req, res) => {
    let messages
    try {
      const { rows } = await pool.query("SELECT * FROM messages;")
      messages = rows.map((message) => {
        const createdAt = new Date(message.created_at)
        return {
          title: message.title,
          message: message.message,
          userId: message.user_id,
          createdAt: createdAt.toDateString(),
        }
      })
    } catch (error) {
      console.log(error)
      messages = []
    }

    res.render("index", {
      user: req.user,
      messages,
    })
  },
}
