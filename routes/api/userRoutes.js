const router = require('express').Router();

const {
    getAllUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController')

router.route('/').get(getAllUsers).post(newUser);

router.route('/:userId')
.get(getUser)
.put(updateUser)
.delete(deleteUser);




module.exports = router