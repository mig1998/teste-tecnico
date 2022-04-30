var express = require('express');
var router = express.Router();

const axios = require('axios');





var id_usuario = "";







axios.post('http://138.68.7.94:85/busca_comentarios', {})

  .then(res => {

    console.log(`statusCode: ${res.status}`);

    coments = res.data
  })

  .catch(error => {
    res.send(error, 'Falha no Cadastro, você deixou algum campo')
  });





/* GET home page. */
router.get('/cadastrar', function (req, res, next) {


  res.clearCookie('id_usuario')



  axios.post('http://138.68.7.94:85/cadastro', {
    nome: req.query.nome,
    email: req.query.email
  })

    .then(res => {
      email = req.query.email
      nome = req.query.nome
      id_usuario = res.data.id;


      console.log(`statusCode: ${res.status}`);
      console.log(res);



    })

    .catch(error => {
      res.send(error, 'Falha no Cadastro, você deixou algum campo')
    });

  res.render('index', { title: 'Cadastrar' });

});



// comentar
router.get('/comentar', function (req, res, next) {

  res.cookie("id_usuario", id_usuario, {
    maxAge: 5000,
    httpOnly: true
  });

console.log(req.query.comentario)


  axios.post('http://138.68.7.94:85/add_comentario', {
    id_usuario: req.cookies.id_usuario,
    comentario: req.query.comentario,

  })
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);

    })

    .catch(error => {
      res.send(error, 'Falha ao comentar, você deixou o campo vazio!')
    });


    axios.post('http://138.68.7.94:85/busca_comentarios', {})

    .then(res => {

      console.log(`statusCode: ${res.status}`);

      coments = res.data
    })

    .catch(error => {
      res.send(error, 'Falha no Cadastro, você deixou algum campo')
    });




  res.render('comentar', { title: 'Comentar', comentarios: coments, id: id_usuario});
});










module.exports = router;
