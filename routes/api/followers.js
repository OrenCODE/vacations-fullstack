const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load models
const Vacation = require('../../models/Vacation');
const User = require('../../models/User');
const Follow = require('../../models/Follow');

// @route   GET api/followers
// @desc    followers route all followers
// @access  private

router.get('/', (req, res) => {
    Follow.find()
        .then(followers => res.json(followers))
});

// @route   GET api/followers
// @desc    followers route
// @access  private

router.get('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {};
        Follow.findOne({user: req.user.id})
            .then(follow => {
                if (!follow) {
                    errors.nonfollow = 'This user is currently not following any vacation';
                    return res.status(404).json(errors);
                }
                res.json(follow);
            })
            .catch(err => res.status(404).json(err));
    });

// @route   POST api/followers/:id
// @desc    followers route follow vacationId + update numOfFollowers
// @access  private

router.post('/:id', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {};
        Follow.findOne({
            userId: req.user.id,
            vacationId: req.params.id
        })
            .then(user => {
                if (user) {
                    errors.alreadyfollowed = 'You already followed this vacation';
                    return res.status(400).json(errors);
                } else {
                    const newFollow = new Follow({
                        userId: req.user.id,
                        followerEmail: req.user.email,
                        vacationId: req.params.id
                    });

                    Vacation.updateOne({_id: req.params.id}, {$inc: {numOfFollowers: 1}}, {new: true})
                        .then(() => {
                            res.status(200)
                        });

                    newFollow.save()
                        .then(following => res.json(following));
                }
            });
    });

// @route   DELETE api/followers
// @desc    followers route delete follow + update numOfFollowers
// @access  private

router.delete('/:id', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Follow.findOne({
            userId: req.user.id,
            vacationId: req.params.id
        })
            .then(follower =>
                Vacation.updateOne({_id: req.params.id}, {$inc: {numOfFollowers: -1}}, {new: true})
                    .then(() => {
                        follower.remove();
                        res.json({success: true});
                        res.status(200)
                    })
            )
    });

// module.exports = router;
