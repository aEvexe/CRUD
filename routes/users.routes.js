const { createUser, getAllUsers, getUserById } = require("../controllers/users.controller")

const router = require("express").Router()

router.post('/create', createUser)
router.get('/all', getAllUsers)
router.get('/:id', getUserById)



module.exports = router