const pool = require('../public/db/index')

const ifExist = async (req, res, next) => {
    const exists = await pool.query(
      'SELECT exists (SELECT 1 FROM users WHERE id=$1 );',
      [req.params.id]
    )
    console.log(exists)
    if (exists.rows[0].exists) {
      next()
    } else {
      return res.send('no this user').sendStatus(400)
    }
  }

const getAllUsers = async function (req, res, next) {
  try {
    const data = await pool.query('SELECT * from users')
    console.log(111111111111)
    res.json(data)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
}

const getOneUser = async function (req, res) {
  try {
    const data = await pool.query('SELECT * FROM users WHERE id=$1', [
      req.params.id
    ])
    res.json(data.rows)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
}

const createUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } else {
    const data = await pool.query(
      'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3);',
      [req.body.first_name, req.body.last_name, req.body.age]
    )
    console.log(body.first_name)
    res.json(data.rows)
  }
}

const updateUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } else {
    const data = await pool.query(
      'UPDATE  users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING*;',
      [req.body.first_name, req.body.last_name, req.body.age, req.params.id]
    )
    res.json(data.rows)
  }
}

const deleteUser = async (req, res) => {
  const data = await pool.query('DELETE FROM users WHERE id=$1', [
    req.params.id
  ])
  res.send('user deleted')
}

module.exports = {ifExist, getAllUsers, getOneUser, createUser, updateUser, deleteUser }
