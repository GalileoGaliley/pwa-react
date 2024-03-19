const {Router} = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.registration);
router.post('/login', UserController.login);

module.exports = router;
