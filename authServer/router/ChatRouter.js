const {Router} = require('express');
const router = new Router();
const ChatController = require('../controllers/ChatController');

router.post('/history', ChatController.getHistory);
router.post('/send-message', ChatController.message);

module.exports = router;
