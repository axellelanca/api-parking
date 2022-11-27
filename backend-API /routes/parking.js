const express = require('express');
const { body } = require('express-validator');
const parkingController = require("../controllers/parking");
const isAuth = require('../middleware/is-auth');
const cors = require('cors');


const router = express.Router();

// GET /parking/spots
router.get('/spots', isAuth, cors(), parkingController.getSpots);

// POST /parking/spot
router.post('/spot', isAuth , [
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
router.get('/spot/:spotId', isAuth, parkingController.getSpot);

// PUT /parking/spot/spotId
router.put('/spot/:spotId', isAuth, [
    body('num')
        .isInt(),
    body('floor')
        .isInt({min: -3, max: 4}),
    body('available')
        .isBoolean()
], parkingController.updateSpot);

// DELETE /parking/spot/spotId
router.delete('/spot/spotId', isAuth, parkingController.deleteSpot);


module.exports = router;