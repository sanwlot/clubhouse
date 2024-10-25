const pool = require("../db/pool")

module.exports = {
  postDeleteMessage: async (req, res) => {
    const messageId = req.params.id // Get the message ID from the URL
    try {
      await pool.query("DELETE FROM messages WHERE id = $1", [messageId])
      res.redirect("/") // Redirect to the homepage after deleting
    } catch (error) {
      console.error(error)
      res.status(500).send("Error deleting the message.")
    }
  },
}
