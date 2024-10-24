const pool = require("../db/pool")

module.exports = {
  getIndex: async (req, res) => {
    let messages
    try {
      const { rows } = await pool.query(
        " SELECT messages.id, messages.title, messages.message, messages.created_at, users.first_name, users.last_name FROM messages JOIN users ON messages.user_id = users.id;"
      )
      messages = rows
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((message) => {
          const createdAt = new Date(message.created_at)
          return {
            id: message.id,
            title: message.title,
            message: message.message,
            userId: message.user_id,
            author: message.first_name + " " + message.last_name,
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
