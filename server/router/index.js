const {Router} = require('express');
const router = new Router();

const userRouter = require('./UserRouter');
const chatRouter = require('./ChatRouter');

const authMiddleware = require('../middleware/AuthMiddleware');

router.use('/user', userRouter);
router.use('/chat', authMiddleware, chatRouter);

module.exports = router;
