var express = require('express');
var router = express.Router();
var serviciosModel = require("./../../models/serviciosModel");
var cloudinary = require("cloudinary").v2;


router.get('/', async function(req, res, next) {
  var servicios = await serviciosModel.getServicios();
  
  servicios = servicios.map(servicio => {

    if (servicio.imagen_id) {
      const imagen = cloudinary.url(servicio.imagen_id, {
        width: 100,
        height: 100,
        crop: 'fill'
      });
      return { ...servicio, imagen };
    } else {
      return { ...servicio, imagen: '' };
    }
  });
  
  res.render('admin/servicios', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    servicios
  });
});


router.get("/agregar", (req, res, next) => {
  res.render("admin/agregar", {
    layout: "admin/layout"
  });
});

router.get("/eliminar/:id", async (req, res, next) => {
  var id = req.params.id;
 await serviciosModel.deleteServicioById(id);
  res.redirect("/admin/servicios");
});


router.post('/agregar', async (req, res, next) => {
  try {
    var imagen_id = "";


    if (req.files && Object.keys(req.files).length > 0) {
      let imagen = req.files.imagen;
      let result = await cloudinary.uploader.upload(imagen.tempFilePath);
      imagen_id = result.public_id;
    }


    if (
      req.body.nombre != "" && 
      req.body.duracion != "" && 
      req.body.descripcion != ""
    ) {

      await serviciosModel.insertServicio({
        nombre: req.body.nombre,
        duracion: req.body.duracion,
        descripcion: req.body.descripcion,
        imagen_id: imagen_id 
      });

      res.redirect('/admin/servicios');
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, 
        message: 'Todos los campos son requeridos'
      });
    }

  } catch (error) {
    console.log(error);
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, 
      message: 'No se pudo cargar el servicio'
    });
  }
});

router.get("/modificar/:id", async (req, res, next) => {
  var id = req.params.id;
  var servicio = await serviciosModel.getServiciosById(id);

  let imagen = '';
    if (servicio.imagen_id) {
      imagen = cloudinary.url(servicio.imagen_id, {
        width: 200,
        height: 200,
        crop: 'fill'
      });
    }

  res.render("admin/modificar", {
    layout: "admin/layout",
    servicio: {
        ...servicio,
        imagen
      }
  });
});

router.post('/modificar', async (req, res, next) => {
  try {
    let imagen_id = req.body.img_original;
    let borrar_imagen_vieja = false;

    // chequeo si el usuario quiere borrar la imagen
    if (req.body.img_delete === "1") {
      imagen_id = null;
      borrar_imagen_vieja = true;
    }

    // chequeo si el usuario subió una imagen nueva
    if (req.files && Object.keys(req.files).length > 0) {
      let imagen = req.files.imagen;
      let result = await cloudinary.uploader.upload(imagen.tempFilePath);
      imagen_id = result.public_id;
      borrar_imagen_vieja = true;
    }

    // armo el objeto a modificar
    var obj = {
      nombre: req.body.nombre,
      duracion: req.body.duracion,
      descripcion: req.body.descripcion,
      imagen_id: imagen_id
    };

    await serviciosModel.modificarServicioById(obj, req.body.id);
    res.redirect('/admin/servicios');

  } catch (error) {
    console.log(error);
    
    // si falla se carga con la imagen original
    let imagen = '';
    if (req.body.img_original) {
      imagen = cloudinary.url(req.body.img_original, {
        width: 200,
        height: 200,
        crop: 'fill'
      });
    }

    // vuelvo a renderizar
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo modificar el servicio',
      servicio: {
        id: req.body.id,
        nombre: req.body.nombre,
        duracion: req.body.duracion,
        descripcion: req.body.descripcion,
        imagen_id: req.body.img_original,
        imagen: imagen
      }
    });
  }
});


module.exports = router;