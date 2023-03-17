// modules required for routing
const express = require('express');
const router = express.Router();
const Incident = require('../models/incidents');
const { sortIncidents } = require('../helper/incidents-helper');

/* GET incidents List page. READ */
router.get('/', (req, res, next) => {
  // find all incidents in the incidents collection
  Incident.find((err, incidents) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('incidents/index', {
        title: 'Incidents',
        incidents: sortIncidents(incidents)
      });
    }
  });

});

//  GET the Incident Details page in order to add a new Incident
router.get('/add', (req, res, next) => {
  res.render('incidents/details', {
    title: 'Add Incident',
    incident: {}
  });
});

// POST process the Incident Details page and create a new Incident - CREATE
router.post('/add', (req, res, next) => {
  let newIncident = Incident({
    "Title": req.body.title,
    "Description": req.body.description,
    "Date": req.body.date,
    "Status": 'Pending',
    "Severity": req.body.severity,
    "Reporter": req.body.reporter,
    "Area": req.body.area,
    "Location": req.body.location,
  });

  Incident.create(newIncident, (err, incident) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/incidents');
    }
  });
});

// GET the Incident Details page in order to edit an existing Incident
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, bookToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.render('books/details', {
        title: 'Edit Book', book: bookToEdit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  let updatedBook = Book({
    "_id": id,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre,
  });

  Book.updateOne({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  Book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect('/books');
    }
  });
});


module.exports = router;
