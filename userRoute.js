const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/new_user', userController.createUser);
router.get('/get_users', userController.getUsers);
router.get('/get_user_id/:id', userController.getUserById);
router.put('/update_user/:id', userController.updateUser);
router.delete('/delete_user/:id', userController.deleteUser);



module.exports = router;