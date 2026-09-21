# ⚙️ Estética Artemisa — Backend & Admin Panel

Servidor de API REST y panel administrativo desarrollado en **Node.js** y **Express** para la gestión dinámica del catálogo de servicios y recepción de consultas de **Estética Artemisa**.

> 🎓 **Proyecto Académico:** Trabajo Práctico Final desarrollado para el curso **Experto Universitario en Full Stack** de la **Universidad Tecnológica Nacional (UTN)**.
> 
> **Desarrollado por:** Andrea Guinder  
> **Año:** 2026

---

## 🔗 Enlaces del Proyecto

* **API REST & Health Check:** [https://esteticas-backend.onrender.com/api/ping](https://esteticas-backend.onrender.com/api/ping)
* **Panel de Administración (Login):** [https://esteticas-backend.onrender.com/admin/login](https://esteticas-backend.onrender.com/admin/login)
* **Aplicación Frontend (Next.js):** [https://esteticas-frontend.vercel.app/](https://esteticas-frontend.vercel.app/)

---

## 🛠️ Tecnologías Utilizadas

* **Entorno de Ejecución:** Node.js
* **Framework Web:** Express.js
* **Motor de Plantillas:** Handlebars (`hbs`) para el panel de administración.
* **Base de Datos:** MySQL alojada en el servicio cloud **Aiven**.
* **Gestión de Imágenes:** `express-fileupload` e integración con la API de **Cloudinary**.
* **Envío de Correos:** `nodemailer` para el procesamiento del formulario de contacto.
* **Autenticación y Sesiones:** `express-session`, cookies y cifrado de contraseñas con MD5.
* **CORS:** Middleware `cors` para habilitar peticiones seguras desde el frontend en Vercel.
* **Despliegue:** [Render](https://render.com/)

---

## 📌 Funcionalidades Principales

### 1. Panel Administrativo (CRUD Completo en Handlebars)
Acceso protegido mediante autenticación de usuario (`/admin/login`) que permite a la administración gestionar la base de datos en tiempo real:
* **Create (Crear):** Alta de nuevos servicios con subida directa de imágenes a Cloudinary.
* **Read (Leer):** Tabla con el listado completo de servicios, duración e imágenes cargadas.
* **Update (Modificar):** Edición completa de título, descripción, tiempo y reemplazo opcional de imagen.
* **Delete (Eliminar):** Borrado físico de registros almacenados en la base de datos MySQL.

### 2. API REST (Endpoints Públicos)
* `GET /api`: Retorna la lista completa de servicios en formato JSON con la URL formateada de las imágenes en Cloudinary.
* `GET /api/ping`: Endpoint ligero de verificación de estado que ejecuta una consulta en MySQL para mantener despiertas las instancias gratuitas de Render y Aiven.
* `POST /api/contacto`: Recibe las consultas enviadas desde el formulario frontend y las procesa enviando un correo electrónico formateado mediante **Nodemailer**.

---

## ⚙️ Variables de Entorno (.env)

Para ejecutar el servidor localmente, crea un archivo .env en la raíz del proyecto con la siguiente estructura:

PORT=3000

# Base de datos MySQL (Aiven)
MYSQL_HOST=tu-host-aiven.aivencloud.com
MYSQL_USER=tu_usuario
MYSQL_PASSWORD=tu_password
MYSQL_DB_NAME=esteticas
MYSQL_PORT=12345

# Cloudinary
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME

# Nodemailer / SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_password_de_aplicacion

## 🛠️ Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/andreaguinder/esteticas-backend.git](https://github.com/andreaguinder/esteticas-backend.git)
    ```

2. **Instalar dependencias:**
   ```bash
   npm install
    ```

3. **Ejecutar servidor de desarrollo:**
   ```bash
   npm start
    ```

## ¿Te gustaría colaborar o tenés un desafío laboral?

¡Me encantaría conectar con vos! Estoy abierta a nuevas oportunidades, proyectos desafiantes o simplemente charlar sobre tecnología.

* **Email:** [andreabelen.guinder@gmail.com](mailto:andreabelen.guinder@gmail.com)
* **LinkedIn:** [https://www.linkedin.com/in/andrea-guinder/](https://www.linkedin.com/in/andrea-guinder/)
* **Portfolio:** [https://andreaguinder.com/](https://andreaguinder.com/)