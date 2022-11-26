const express = require('express');
const { body } = require('express-validator');
const parkingController = require("../controllers/parking");
//const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /parking/spots
router.get('/spots', parkingController.getSpots);

// POST /parking/spot
router.post('/spot', [
    body('num')
        .not()
        .isEmpty()
        .isInt(),
    body('floor')
        .not()
        .isEmpty()
        .isInt({min: -3, max: 4}) // Must be better to set min and max values dynamically, need to improve that
], parkingController.postSpot);

// GET /parking/spot/spotId
router.get('/spot/:spotId', parkingController.getSpot);

// PUT /parking/spot/spotId
router.put('/spot/:spotId', [
    body('num')
        .isInt(),
    body('floor')
        .isInt({min: -3, max: 4}),
    body('available')
        .isBoolean()
], parkingController.updateSpot);

// DELETE /parking/spot/spotId
router.delete('/spot/spotId', parkingController.deleteSpot);


module.exports = router;