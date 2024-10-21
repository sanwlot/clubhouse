const pool = require("../db/pool")

module.exports = {
  getLogin: (req, res) => {
    res.send(`
            <form method="POST"> 
                <h1>Log in</h1>
                <input type="email" placeholder="email" name="email" required /> <br>
                <input type="password" placeholder="password" name="password" required /> <br>
                <button>Log in</button>
            </form>
        `)
  },
}
