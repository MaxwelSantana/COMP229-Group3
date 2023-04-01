// modules required for routing
const express = require('express');
const jwt = require('jsonwebtoken');
const DB = require('../config/db');
const router = express.Router();
const Incident = require('../models/incidents');
const { sortIncidents } = require('../helper/incidents-helper');

function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, DB.Secret, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

/* GET incidents List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all incidents in the incidents collection
  Incident.find((err, incidents) => {
    if (err) {
      return console.error(err);
    }
    else {
      // res.render('incidents/index', {
      //   title: 'Incidents',
      //   incidents: sortIncidents(incidents)
      // });
      res.json(incidents);
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

// GET the Incident Details page in order to edit an existing Incident
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Incident.findById(id, (err, incidentToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(incidentToEdit);
    }
  });
});

// POST process the Incident Details page and create a new Incident - CREATE
router.post('/', (req, res, next) => {
  let newIncident = Incident({
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Date": req.body.Date,
    "Status": 'Pending',
    "Severity": req.body.Severity,
    "Reporter": req.body.Reporter,
    "Area": req.body.Area,
    "Location": req.body.Location,
  });

  Incident.create(newIncident, (err, incident) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(incident);
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  let updatedIncident = Incident({
    "_id": id,
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Date": req.body.Date,
    "Status": req.body.Status,
    "Severity": req.body.Severity,
    "Reporter": req.body.Reporter,
    "Area": req.body.Area,
    "Location": req.body.Location,
  });
  Incident.updateOne({ _id: id }, updatedIncident, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(updatedIncident);
    }
  });

});

// GET - process the delete by user id
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Incident.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.json(id);
    }
  });
});


module.exports = router;
