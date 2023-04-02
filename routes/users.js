var express = require('express')
var router = express.Router()
const { body, validationResult, User } = require('express-validator')

const pool = require('../public/db/index')

const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  ifExist
} = require('../controllers/userController')

const checkInput = (req, res, next) => {
  const firstName = req.body.first_name
  const lastName = req.body.last_name
  if (firstName && lastName) {
    next()
  } else {
    return res.sendStatus(400)
  }
}



/* GET users listing. */
router
  .get('/', getAllUsers)
  .get('/:id', ifExist,getOneUser)
  .post(
    '/',
    body('first_name').isLength({ min: 2 }),
    body('last_name').isLength({ min: 2 }),
    createUser
  )
  .put(
    '/:id',
    body('first_name').isLength({ min: 1 }),
    body('last_name').isLength({ min: 1 }),
    ifExist,
    updateUser
  )
  .delete('/:id', ifExist, deleteUser)

module.exports = router
