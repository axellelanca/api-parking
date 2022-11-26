const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const {isEmpty} = require("validator");

const router = express.Router();

// PUT /auth/signup
router.put('/signup', [
    body('lastName')
        .trim()
        .not()
        .isEmpty(),
    body('firstName')
        .trim()
        .not()
        .isEmpty(),
    body('role')
        .trim()
        .not()
        .isEmpty(),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {req}) => {
            return User.findOne({email: value})
                .then(userDoc => {
                    if(userDoc) {
                        return Promise.reject('E-mail address already exists!');
                    }
                })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min:8})
], authController.signup);

router.post('/login', authController.login);

module.exports = router;