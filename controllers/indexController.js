const pool = require("../db/pool")

module.exports = {
  getIndex: async (req, res) => {
    let messages
    try {
      const { rows } = await pool.query("SELECT * FROM messages;")
      messages = rows.map((message) => {
        const createdAt = new Date(message.created_at)
        return `<li style="margin-bottom: 20px;">
          <div><strong>${message.title}</strong></div>
          <div>${message.message}</div>
          <div style="font-size:10px;">
          ${
            req.user
              ? "<div>Author ID: <em>" + message.user_id + "</em> </div>"
              : "<div><em>Unknown author</em></div>"
          }
          </div>
          <div style="font-size:7px;">Posted on: ${createdAt.toDateString()}</div>
        </li>`
      })
    } catch (error) {
      console.log(error)
    }
    if (!req.user) {
      return res.send(`
        <h1>CLUBHOUSE</h1>
        <h2>Welcome Guest</h2>
        <a href="/log-in">Log in</a>
        <a href="/sign-up">Sign up</a>
        <ul> 
          ${messages && messages.join("")}
        </ul>
      `)
    }

    res.send(`

        <h1>CLUBHOUSE</h1>
        <h2>Welcome ${req.user.first_name}</h2>
        ${
          !req.user.membership
            ? '<a href="/join-membership">Join Membership</a>'
            : "Pro member"
        }
        <br>
        <a href="/log-out">Log out</a> 
        <br>
        <br>
        
        <a href="/create-new-message">Create a new message</a>
        <ul> 
         ${messages && messages.join("")}
        </ul>
      `)
  },
}
