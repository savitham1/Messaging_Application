const express = require('express');

const { signup, login } = require('../controllers/auth.js');

// get a router from that express
const router = express.Router();

router.post('/signup');
router.post('/login');

// export the router
module.exports = router;