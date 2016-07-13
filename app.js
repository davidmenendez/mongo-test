var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/metal');

var bandSchema = new mongoose.Schema({
	name: String,
	genre: String
});
var Band = mongoose.model('Band', bandSchema);

app.get('/', function (req, res) {
	Band.find( function(err, bands) {
		if (err) throw err;
		res.status(200).render('index', { bands: bands });
	});
});

app.post('/bands', function (req, res) {
	var bandEntry = new Band(req.body);
	bandEntry.save(function (err, bandEntry) {
		if (err) return console.error(err);
		res.status(200).send(bandEntry);
	});
});

app.get('/bands', function (req, res) {
	Band.find( function(err, bands) {
		if (err) throw err;
		res.status(200).send(bands);
	});
});

app.listen(8000, function () {
	console.log('active on 8000');
});