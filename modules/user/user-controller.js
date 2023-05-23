const { Router } = require('express');
const { authenticate, register } = require('./user-service');

const router = Router();

router.post('/v1/auth', authenticate);
router.post('/v1/auth/signup', register);

module.exports = router;