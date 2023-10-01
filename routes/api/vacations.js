const express = require('express');
const passport = require('passport');
const router = express.Router();

// Load Vacation Model
const Vacation = require('../../models/Vacation');

// @route   GET api/vacations
// @desc    get all vacations
// @access  private for Admin or User

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const vacations = await Vacation.find().sort({ startDate: -1 });
        res.json(vacations);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// @route   GET api/vacations/:id
// @desc    get vacation by id
// @access  private for Admin

router.get('/:id', async (req, res) => {
    try {
        const vacation = await Vacation.findById(req.params.id);
        res.json(vacation);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// @route   POST api/vacations
// @desc    creates a new vacation
// @access  private for Admin

router.post('/', async (req, res) => {
    try {
        const { description, destination, photoURL, startDate, endDate, price } = req.body;
        const newVacation = new Vacation({
            description,
            destination,
            photoURL,
            startDate,
            endDate,
            price,
        });

        const vacation = await newVacation.save();
        res.json(vacation);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// @route   DELETE api/vacations
// @desc    delete vacation by id
// @access  private for Admin

router.delete('/:id', async (req, res) => {
    try {
        const vacation = await Vacation.findById(req.params.id);
        if (!vacation) {
            return res.status(404).json({ success: false });
        }
        await vacation.remove();
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// @route   PUT api/vacations
// @desc    edit vacation by id
// @access  private for Admin

router.put('/update/:id', async (req, res) => {
    try {
        await Vacation.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const vacation = await Vacation.findOne({ _id: req.params.id });
        res.json(vacation);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// @route   GET api/vacations/current/followed
// @desc    get followed vacations only (reports)
// @access  private for Admin

router.get('/current/followed', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const vacations = await Vacation.find({ numOfFollowers: { $gt: 0 } });
        res.json(vacations);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;
