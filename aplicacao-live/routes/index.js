var express = require('express');
var router = express.Router();

const axios = require('axios');





var id_usuario = "";


// just a home page
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Inicio' });
});





// carregar os comentarios ao iniciar a aplicação

function carregarComentarios() {
  axios.post('http://138.68.7.94:85/busca_comentarios', {})

    .then(res => {

      console.log(`statusCode: ${res.status}`);

      coments = res.data
    })

    .catch(error => {
      res.send(error)
    });
}

carregarComentarios();




/* GET cadastrar page. */
router.get('/cadastrar', function (req, res, next) {

  res.clearCookie('id_usuario')
  res.render('cadastrar', { title: 'Cadastrar' });
});


/* Post cadastrar page. */
router.post('/cadastrar', function (req, res, next) {

  // cadastrar usuario com parametros do form method Post
  axios.post('http://138.68.7.94:85/cadastro', {
    nome: req.body.nome,
    email: req.body.email
  })
    .then(res => {
      // pegar id do user cadastrado/logado
      id_usuario = res.data.id;


      console.log(`statusCode: ${res.status}`);
      console.log(res);

    })

    .catch(error => {
      res.send(error, 'Falha no Cadastro, você deixou algum campo Vazio')
    });

  res.render('cadastrar', { title: 'Cadastrar' });

})




// get comentar page
router.get('/comentar', function (req, res, next) {

  //carrega os comentarios e exibe na tela
  carregarComentarios();

  // salvar o id usuario no cookie
  res.cookie("id_usuario", id_usuario, {
    maxAge: 5000,
    httpOnly: true
  });

  res.render('comentar', { title: 'Comentar', comentarios: coments, id: id_usuario });
});





// post comentar page
router.post('/comentar', function (req, res, next) {
  // carrega os comentarios e exibe na tela
  carregarComentarios();

  // cadastrar comentário com parametros do form method post e pegar o id que foi passado para o cookie
  axios.post('http://138.68.7.94:85/add_comentario', {
    id_usuario: req.cookies.id_usuario,
    comentario: req.body.comentario,

  })
    .then(res => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
      router.get("/comentar")
    })

    .catch(error => {
      res.send(error, 'Falha ao comentar, você deixou o campo vazio!')
      router.get("/comentar")
    });






  res.render('comentar', { title: 'Comentar', comentarios: coments, id: id_usuario });
})







module.exports = router;
