const express = require('express');
const { body } = require('express-validator');
const usersController = require("../controllers/users");
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /user/users
router.get('/users', isAuth, usersController.getUsers);

// GET /user/user/:userId
router.get('/user/:userId', isAuth, usersController.getUser);

// PUT /user/user/:userId
router.put('/user/:userId',isAuth, [
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
        .normalizeEmail(),
], usersController.updateUser);

// DELETE user/user/userId
router.delete('/user/:userId', isAuth, usersController.deleteUser);

module.exports = router;