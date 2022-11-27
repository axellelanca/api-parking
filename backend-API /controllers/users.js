const Spot = require("../models/parkingSpot");
const User = require('../models/user');
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => {
            if(!users.length) {
                const error = new Error('Could not find user.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Fetched users successfully.',
                spots: users,
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next();
        })
};


exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    User.findById(userId)
        .then(user => {
            if (!user){
                const error = new Error('Could not find user.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'user fetched.',
                spot: user
            });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;

    User.findById(userId)
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user');
                error.statusCode = 404;
                throw error;
            }
            bcrypt.hash(password, 12)
                .then(hashedPwd => {
                    console.log(user.firstName, hashedPwd);
                    user.firstName = fName;
                    user.lastName = lName;
                    user.email = email;
                    user.role = role;
                    user.password= hashedPwd;

                    return user.save();
                })
                .then(result => {
                    res.status(200).json({message: 'user updated', user: result});
                })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
                next(err);
            }
        })
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            if(!user){
                const error = new Error('Could not find user');
                error.statusCode = 404;
                throw error;
            }
            return User.findByIdAndRemove(userId);
        })
        .then(result => {
            res.status(200).json({
                message: 'User Deleted successfully.'
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}