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
    });

// @route   GET api/vacations/:id
// @desc    get vacation by id
// @access  private for Admin

router.get('/:id', (req, res) => {
    Vacation.findById(req.params.id).then(vacation => res.json(vacation))
});

// @route   POST api/vacations
// @desc    creates new vacation
// @access  private for Admin

// FIX RESPONSE HERE WITH VALIDATION //
router.post('/', (req, res) => {
    const newVacation = new Vacation({
        description: req.body.description,
        destination: req.body.destination,
        photoURL: req.body.photoURL,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        price: req.body.price
    });

    newVacation.save()
        .then(vacation => res.json(vacation));
});

// @route   DELETE api/vacations
// @desc    delete vacation by id
// @access  private for Admin

router.delete('/:id', (req, res) => {
    Vacation.findById(req.params.id).then(vacation =>
        vacation.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

// @route   PUT api/vacations
// @desc    edit vacation by id
// @access  private for Admin

// FIX RESPONSE HERE WITH VALIDATION //
router.put('/update/:id', (req, res) => {
    Vacation.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Vacation.findOne({_id: req.params.id}).then((vacation) => {
            res.json(vacation);
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
    });


module.exports = router;
