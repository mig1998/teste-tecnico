var express = require('express');
var router = express.Router();





/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Cadastrar' });
});

router.get('/comentar', function (req, res, next) {
  res.render('comentar', { title: 'Comentar' });
});




module.exports = router;
