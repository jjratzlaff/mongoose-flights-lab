var express = require('express');
var router = express.Router();
const flightCtrl = require('../controllers/flights')

//get requests to  /movies/new
router.get('/new', flightCtrl.new)

router.get('/:id', flightCtrl.show);
//Post request to /movies
router.post('/', flightCtrl.create)


router.get('/', flightCtrl.index)

module.exports = router;