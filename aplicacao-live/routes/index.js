var express = require('express');
var router = express.Router();

const axios = require('axios')











/* GET home page. */
router.get('/cadastrar', function (req, res, next) {
  var usuario_id = 0;

  res.cookie("email", `${req.query.email}`, {
    maxAge: 5000,
    httpOnly: true
  });
  res.cookie("nome", `${req.query.nome}`, {
    maxAge: 5000,
    httpOnly: true
  });
  res.cookie("usuario_id", usuario_id, {
    maxAge: 5000,
    httpOnly: true
  });

  axios.post('http://138.68.7.94:85/cadastro', {
    nome: req.query.nome,
    email: req.query.email
  })

    .then(res => {
      usuario_id = res.data.id;

      console.log(`statusCode: ${res.status}`);
      console.log(res);


      router.get('/del-cookie')
      req.query.nome = ''
      req.query.email = ''
    })

    .catch(error => {
      res.send(error, 'Falha no Cadastro, você deixou algum campo')
    });

  res.render('index', { title: 'Cadastrar' });

});






// comentar
router.get('/comentar', function (req, res, next) {

  res.cookie("comentario", `${req.query.comentario}`, {
    maxAge: 5000,
    httpOnly: true
  });


  axios.post('http://138.68.7.94:85/add_comentario', {
    id_usuario: 83,
    comentario: req.query.comentario,

  })
    .then(res => {
      usuario_id = res.data.id;

      console.log(`statusCode: ${res.status}`);
      console.log(res);

    })

    .catch(error => {
      res.send(error, 'Falha ao comentar, você deixou o campo vazio!')
    });



  res.render('comentar', { title: 'Comentar' });
});







// todos os comentarios (ate 100)
router.get('/coments', function (req, res, next) {

  var coments =
    [{
      comentario: '',
      data_entrada: '',
      horario: '',
      nome: '',
      email: ''

    }]

  axios.post('http://138.68.7.94:85/busca_comentarios', {})

    .then(res => {

      console.log(`statusCode: ${res.status}`);

      coments = [{
        comentario: res.data.comentario,
        data_entrada: res.data.data_entrada,
        horario: res.data.horario,
        nome: res.data.nome,
        email: res.data.email
      }]


      coments = res.data



    })

    .catch(error => {
      res.send(error, 'Falha no Cadastro, você deixou algum campo')
    });


  console.log(coments);
  res.send(coments);
});




router.get('/del-cookie', function (req, res, next) {

  res.clearCookie('nome')
  res.clearCookie('email')
  router.get('/cadastrar')
});





// router.get('/set-cookie', function (req, res, next) {
//   res.cookie("token name", "encrypted cookie string Value", {
//     maxAge: 5000,
//     // expires:new Date(''),
//     httpOnly: true,
//     // secure:true ssl
//   });
//   res.send("worth!");
// });

// router.get('/get-cookie', function (req, res, next) {
//   res.send(req.cookies);
// });



// router.get('/del-cookie', function (req, res, next) {
//   res.clearCookie('token name')
// });








module.exports = router;
