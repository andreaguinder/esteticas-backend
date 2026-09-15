var express = require('express');
var router = express.Router();
var serviciosModel = require("../models/serviciosModel");
var cloudinary = require("cloudinary").v2;
var nodemailer = require('nodemailer');


router.get('/', async function(req, res, next) {
  var servicios = await serviciosModel.getServicios();
  
  servicios = servicios.map(servicio => {

    if (servicio.imagen_id) {
      const imagen = cloudinary.url(servicio.imagen_id, {
        width: 300,
        height: 300,
        crop: 'fill'
      });
      return { ...servicio, imagen };
    } else {
      return { ...servicio, imagen: '' };
    }
  });
  
  res.json(servicios);
  });




  router.post('/contacto', async (req, res) => {
    try {
    const mail = {
      to: 'andreabelen.guinder@gmail.com, flavia.ursino@gmail.com',
      subject: 'Contacto desde la web Estética Artemisa',
      html: `Nombre: ${req.body.nombre}\nEmail: ${req.body.email}\nSe contactó a través de la web y escribió el siguiente mensaje:\n${req.body.mensaje}\n Su teléfono es ${req.body.telefono}`
    };

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail(mail);
    res.status(201).json({ error: false, message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error enviando mail:',error);
    res.status(500).json({ error: true, message: 'Error al enviar el correo' });
  }

      });


    module.exports = router;