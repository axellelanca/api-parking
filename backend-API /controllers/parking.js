const { validationResult } = require('express-validator');

const Spot = require('../models/parkingSpot');
const User = require('../models/user');

exports.getSpots = (req, res, next) => {
    Spot.find()
        .then(spots => {
            if(!spots.length) {
                const error = new Error('Could not find spot.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Fetched spots successfully.',
                spots: spots,
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next();
        })
};

/*
* Vérifier si le spot existe déjà
* */
exports.postSpot = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }

    const num = req.body.num;
    const floor = req.body.floor;

    const spot = new Spot({
        num: num,
        floor: floor
    });
    spot.save()
        .then(result => {
            res.status(201).json({
                message: 'Spot created successfully!',
                spot: spot
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next();
        })
};

exports.getSpot = (req, res, next) => {
    const spotId = req.params.spotId;
    console.log(spotId);
    Spot.findById(spotId)
        .then(spot => {
            if (!spot){
                const error = new Error('Could not find spot.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Spot fetched.',
                spot: spot
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.updateSpot = (req, res, next) => {
    const spotId = req.params.spotId;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const num = req.body.num;
    const floor = req.body.floor;
    const available = req.body.available;
    Spot.findById(spotId)
        .then(spot => {
            if(!spot) {
                const error = new Error('Could not find spot');
                error.statusCode = 404;
                throw error;
            }
            spot.num = num;
            spot.floor = floor;
            spot.available = available;
            return spot.save();
        })
        .then(result => {
            res.status(200).json({message: 'Spot updated', spot: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
                next(err);
            }
        })
}

exports.deleteSpot = (req, res, next) => {
    const spotId = req.body.spotId;
    Spot.findById(spotId)
        .then(spot => {
            if(!spot){
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error;
            }
            return Spot.findByIdAndRemove(spotId);
        })
        .then(result => {
            res.status(200).json({
                message: 'Spot Deleted successfully.'
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};