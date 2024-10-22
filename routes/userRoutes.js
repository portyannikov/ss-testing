const { signup, login, protect } = require('../controllers/authController');
const { createUser, getAllUsers } = require('../controllers/userController');

const router = require('express').Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/', getAllUsers);
router.post('/', createUser);

module.exports = router;
