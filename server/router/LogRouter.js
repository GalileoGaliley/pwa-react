const {Router} = require('express');
const router = new Router();
const LogController = require('../controllers/LogController');

router.post('/output', LogController.log);

module.exports = router;
