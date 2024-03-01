// import our model so we can talk to the database and perfomr
// our CRUD operations
const FlightModel = require('../models/flights')

module.exports = {
	new: newFlight,
	create: create,
	index,
	show
	// or 
	// create
}

async function show(req, res) {


	try {

		// req.params.id value is coming from the browsers request
		// the name `.id` is defined in the routes/movies show route
		// router.get('/:id', movieCtrl.show);
		const flightFromTheDatabase = await FlightModel.findById(req.params.id)
		const airportCodes = ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'];



		console.log(flightFromTheDatabase);


		// express is changing the ejs into html and sending it to the browser (client side/frontend)
		res.render("flights/show", {
			flight: flightFromTheDatabase,
			airportCodes: airportCodes // the key movie, becomes a variable name in the show.ejs
		});
	} catch (err) {
		res.send(err);
	}
}

async function index(req, res) {

	// then we want to send a ejs page with all the movies to the browser
	try {
		// We want our model to go to the database and get all the movies
		// .find({}) is mongoose model query method
		const flightDocumentsFromTheDB = await FlightModel.find({})
		console.log(flightDocumentsFromTheDB)
		// then we want to send a ejs page with all the movies to the browser
		// movies/index is looking in the views folder for the ejs page
		res.render('flights/index', { flightDocs: flightDocumentsFromTheDB })
		// movieDocs is now a variables inside of views/movies/index.ejs 
	} catch (err) {
		console.log(err)
		res.redirect('/')
	}
}


async function create(req, res) {
	console.log(req.body, " <- is the contents of our form!")
	//req.body.nowShowing = !!req.body.nowShowing // !! forces the value to a boolean
	// remove any whitespace at start and end of cast
	//req.body.cast = req.body.cast.trim();
	// split cast into an array if it's not an empty string - using a regular expression as a separator
	if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);

	try {
		const createdFlightDoc = await FlightModel.create(req.body);
		console.log(createdFlightDoc)
		// for now redirect to new page
		res.redirect('/flights/new')
	} catch (err) {
		console.log(err)
		res.redirect('/flights/new')
	}
}

function newFlight(req, res) {

	// res.render looks in our 
	// views folder for the ejs page
	res.render('flights/new')
}