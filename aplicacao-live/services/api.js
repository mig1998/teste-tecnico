const axios = require('axios')

const user = require('../public/script/caduser')






//  axios.post('http://138.68.7.94:85/cadastro', {
//    nome:user.nome,
//    email:user.email
//   })
//   .then(res => {
//     console.log(`statusCode: ${res.status}`);
//     console.log(res);
//   })
//   .catch(error => {
//     console.error(error);
//   });




  // axios.post('http://138.68.7.94:85/add_comentario', {
  //   id_usuario: 80,
  //    comentario: 'nome'
  // })
  // .then(res => {
  //   console.log(`statusCode: ${res.status}`);
  //   console.log(res);
  // })
  // .catch(error => {
  //   console.error(error);
  // });

  const api = axios.create({
    baseURL: "http://138.68.7.94:85",
  });




module.exports = api