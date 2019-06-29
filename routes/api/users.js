const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');
const Vacation = require('../../models/Vacation');

// @route   POST api/users/register
// @desc    Register new user
// @access  public

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  public

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({email}).then(user => {
        // Check for user
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // User Matched
                    const payload = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isAdmin: user.isAdmin,
                        vacationsFollowed: user.vacationsFollowed
                    }; // Create JWT Payload

                    // Sign Token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {expiresIn: 3600},
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                } else {
                    errors.password = 'Password incorrect';
                    return res.status(400).json(errors);
                }
            })
    })
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    })
});

// @route   PUT api/users/follow/:id
// @desc    add vacationId as follow to the current user
// @access  Private

router.put('/follow/:id', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {};
        User.findOne({
            _id: req.user.id,
            vacationsFollowed: {$elemMatch: {[req.params.id]: "vacation"}}
        })
            .then(vacationId => {
                if (vacationId) {
                    errors.alreadyfollowed = 'You already followed this vacation';
                    return res.status(400).json(errors);
                } else {
                    User.findOneAndUpdate({_id: req.user.id}, {$push: {vacationsFollowed: {[req.params.id]: "vacation"}}})
                        .then(() => {
                            User.findOne({
                                _id: req.user.id
                            })
                                .then(follow => {
                                    Vacation.updateOne({_id: req.params.id}, {$inc: {numOfFollowers: 1}}, {new: true})
                                        .then(() => {
                                            res.status(200);
                                            res.json(follow);
                                        });
                                });
                        })
                }
            })
    });

// @route   DELETE api/users/follow/:id
// @desc    delete vacationId as follow to the current user
// @access  Private

router.delete('/follow/:id', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        User.findOne({
            _id: req.user.id,
            vacationsFollowed: {$elemMatch: {[req.params.id]: "vacation"}}
        })
            .then( () => {
                    User.findByIdAndUpdate({_id: req.user.id}, {$pull: {vacationsFollowed: {[req.params.id]: "vacation"}}})
                        .then(() => {
                            User.findOne({
                                _id: req.user.id
                            })
                                .then(follow => {
                                    Vacation.updateOne({_id: req.params.id}, {$inc: {numOfFollowers: -1}}, {new: true})
                                        .then(() => {
                                            res.status(200);
                                            res.json(follow);
                                        });
                                });
                        })

            })
    });


module.exports = router;
