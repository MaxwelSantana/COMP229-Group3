let mongoose = require('mongoose');

// create a model class
let Incident = mongoose.Schema({
  Title: String,
  Description: String,
  Reporter: String,
  Area: String,
  Location: String,
  Date: Date,
  Status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Done']
  },
  Severity: {
    type: String,
    enum: ['Low', 'Medium', 'High']
  }
}, {
  collection: "incidents"
});

module.exports = mongoose.model('Incident', Incident);
