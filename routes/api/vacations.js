const express = require('express');
const passport = require('passport');
const router = express.Router();

// Load Vacation Model
const Vacation = require('../../models/Vacation');
const Follow = require('../../models/Follow');

// router.get('/test/', (req, res) => {
//         Vacation.aggregate([
//             {
//                 $lookup:
//                     {
//                         from: "followers",
//                         localField: "vacations_ID",
//                         foreignField: "vacationId_ID",
//                         as: "FOLLOWERS"
//                     }
//             }])
//             .sort({numOfFollowers: -1})
//             .then(vacations => res.json(vacations))
//     }
// );

// @route   GET api/vacations
// @desc    get all vacations
// @access  private for Admin

router.get('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
    Vacation.find()
        .sort({startDate: -1})
        .then(vacations => res.json(vacations))
});

router.get('/:id', (req, res) => {
    Vacation.findById(req.params.id).then(vacation => res.json(vacation))
});

// @route   POST api/vacations
// @desc    creates new vacation
// @access  public

//FIX RESPONSE HERE//
router.post('/', (req, res) => {
    const newVacation = new Vacation({
        description: req.body.description,
        destination: req.body.destination,
        photoURL: req.body.photoURL,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        price: req.body.price,
        // numOfFollowers: req.body.numOfFollowers
    });

    newVacation.save()
        .then(vacation => res.json(vacation));
});

// @route   DELETE api/vacations
// @desc    delete vacation by id
// @access  public

router.delete('/:id', (req, res) => {
    Vacation.findById(req.params.id).then(vacation =>
        vacation.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

// @route   DELETE api/vacations
// @desc    delete vacation by id
// @access  public

//FIX VACATION PUT METHOD BODY//
router.put('/update/:id', (req, res) => {
    Vacation.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Vacation.findOne({_id: req.params.id}).then((vacation) => {
            res.json(vacation);
        })
    })
});

module.exports = router;
