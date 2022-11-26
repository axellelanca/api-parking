const express = require('express');
const parkingController = require('../controllers/parking');
//const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/parkingSpot', console.log('your pk slot here'));


module.exports = router;