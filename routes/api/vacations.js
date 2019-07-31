const express = require('express');
const passport = require('passport');
const router = express.Router();

// Load Vacation Model
const Vacation = require('../../models/Vacation');

// @route   GET api/vacations
// @desc    get all vacations
// @access  private for Admin or User

router.get('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Vacation.find()
            .sort({startDate: -1})
            .then(vacations => res.json(vacations))
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    });

// @route   GET api/vacations/:id
// @desc    get vacation by id
// @access  private for Admin

router.get('/:id', (req, res) => {
    Vacation.findById(req.params.id).then(vacation => res.json(vacation))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

// @route   POST api/vacations
// @desc    creates new vacation
// @access  private for Admin

router.post('/',
    (req, res) => {
        const {description, destination, photoURL, startDate, endDate, price} = req.body;
        const newVacation = new Vacation({
            description,
            destination,
            photoURL,
            startDate,
            endDate,
            price,
        });

        newVacation.save()
            .then(vacation => res.json(vacation))
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    });

// @route   DELETE api/vacations
// @desc    delete vacation by id
// @access  private for Admin

router.delete('/:id',
    (req, res) => {
        Vacation.findById(req.params.id).then(vacation =>
            vacation.remove().then(() => res.json({success: true})))
            .catch(err => res.status(404).json({success: false}))
    });

// @route   PUT api/vacations
// @desc    edit vacation by id
// @access  private for Admin

router.put('/update/:id',
    (req, res) => {
        Vacation.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
            Vacation.findOne({_id: req.params.id}).then((vacation) => {
                res.json(vacation)
                    .catch(err => {
                        console.error(err);
                        res.status(500).send(err);
                    });
            })
        })
    });

// @route   GET api/vacations/current/followed
// @desc    get followed vacations only (reports)
// @access  private for Admin

router.get('/current/followed', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Vacation.find({numOfFollowers: {$gt: 0}})
            .then(vacations => res.json(vacations))
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    });

module.exports = router;
