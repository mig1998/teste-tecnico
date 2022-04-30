var express = require('express');
var router = express.Router();

const axios = require('axios')











/* GET home page. */
router.get('/cadastrar', function (req, res, next) {
  res.cookie("email", `${req.query.email}`, {
    maxAge: 5000,
    httpOnly: true
  });
  res.cookie("nome", `${req.query.nome}`, {
    maxAge: 5000,
    httpOnly: true
  });



  res.render('index', { title: 'Cadastrar' });


  axios.post('http://138.68.7.94:85/cadastro', {
    nome: req.query.nome,
    email: req.query.email
  })
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
      router.get('/del-cookie')
   req.query.nome=''
   req.query.email=''
    })
    .catch(error => {
      res.send(error,'Falha no Cadastro, você deixou algum campo')
    });


});




router.get('/del-cookie', function (req, res, next) {

  res.clearCookie('nome')
  res.clearCookie('email')
  router.get('/cadastrar')
});

router.get('/set-cookie', function (req, res, next) {
  res.cookie("token name", "encrypted cookie string Value", {
    maxAge: 5000,
    // expires:new Date(''),
    httpOnly: true,
    // secure:true ssl
  });
  res.send("sua mae");
});

// router.get('/get-cookie', function (req, res, next) {
//   res.send(req.cookies);
// });



// router.get('/del-cookie', function (req, res, next) {
//   res.clearCookie('token name')
// });





router.get('/comentar', function (req, res, next) {
  res.render('comentar', { title: 'Comentar' });
});




module.exports = router;
