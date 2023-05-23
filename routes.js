const { Router } = require('express')
const userRoutes = require('./modules/user/user-controller');

const router = Router();

router.use('/', userRoutes);

module.exports = router;