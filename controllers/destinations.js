const FlightModel = require('../models/flights');
console.log(FlightModel);
module.exports = {
    create
};

async function create(req, res) {
    try {
        const flight = await FlightModel.findById(req.params.id);
        console.log(flight)
		console.log(req.params.id)
		flight.destinations.push({
            airport: req.body.airport,
            arrival: new Date(req.body.arrival)
        });
        await flight.save();
        res.redirect(`/flights/${req.params.id}`);
    } catch (err) {
        console.error(err);
        res.redirect(`/flights/${req.params.id}`);
    }
};
