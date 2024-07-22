const express = require('express')
const app = express()
const PORT = 3000

const pool = require('./db')

app.use(express.json())


app.get('/', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM schools')
    res.status(200).send(data.rows)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/', async (req, res) => {
  const { name, location } = req.body
  try {
    await pool.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [name, location])
    res.status(200).send({message: "successfully added child"})
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.get('/setup', async (req, res) => {
  try {
    await pool.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
    res.status(200).send({message: "successfully created table"})
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})


app.listen(PORT, () => {console.log("listening on port ", PORT)})