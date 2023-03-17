// modules required for routing
let express = require('express');
let router = express.Router();

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    incidents: ''
  });
});

module.exports = router;
