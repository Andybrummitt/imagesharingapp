const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser, deleteCurrentUser } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/current', getCurrentUser);
router.delete('/current/delete', deleteCurrentUser)

module.exports = router;
