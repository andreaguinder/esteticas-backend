var express = require('express');
var router = express.Router();
var usuariosModel = require('../../models/usuariosModel')

/* Diseño de formulario */
router.get('/', function(req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout',
    });
});

/* destruir la sesion*/
router.get('/logout', function (req, res, next) {
  req.session.destroy(); // destruir las variables de sesion (id y usuario)
  res.render('admin/login', {
    layout: 'admin/layout'
  });
}); // cierro logout

/* procesar el formulario */

router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);

    if (data != undefined) {
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;

      res.redirect('/admin/servicios');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    console.log(error);
  } // cierro catch

}); // cierro router.post

module.exports = router;
