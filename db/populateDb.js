const { Client } = require("pg")
require("dotenv").config()

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ),
  last_name VARCHAR ( 255 ),
  membership VARCHAR ( 255 ),
  email VARCHAR ( 255 ),
  password VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER,
  title VARCHAR ( 255 ),
  message VARCHAR ( 255 ),
  createdAt TIMESTAMP
);

INSERT INTO users (first_name, last_name, email, password) 
VALUES
  ('sylvia', 'manenti', 'sylvia@gmail.com', '123'),
  ('ajay', 'sanwlot', 'ajay@gmail.com', 'syl');

INSERT INTO messages (user_id, title, message) 
VALUES
  (1, 'hello', 'this is a test'),
  (2, 'bonjour', 'je taime cherie!');
`

async function main() {
  console.log("seeding...")
  const client = new Client({
    connectionString: process.env.PG_CONNECTION_STRING,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
