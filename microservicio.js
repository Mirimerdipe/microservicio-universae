/**
 * Academic Microservice Project for Universae
 * Author: Miriam M. Díaz Pérez 
 * Github: https://github.com/Mirimerdipe
 * Date: First semester of 2025
 * Description: Basic microservice developed in Node.js + Express for 
 * containerization, orchestration, and deployment practice in Azure.
 * Features:
 * - Test routes (GET and POST) implemented.
 * - Error handling:
 *    - 400 - Bad Request
 *    - 404 - Not Found
 *    - 500 - Internal Server Error
 * Design inspired by:
 * UNIVERSAE Website - https://universae.com/en/everything-leads-to-universae/
 * 
 * -----------------------------------------------------------------------------
 * 
 * Proyecto Académico de Microservicio para Universae 
 * Autora: Miriam M. Díaz Pérez
 * Github: https://github.com/Mirimerdipe
 * Fecha: Primer semestre de 2025
 * Descripción: Microservicio básico desarrollado en Node.js + Express
 * para prácticas de contenerización, orquestación y despliegue en Azure. 
 * Características:
 * - Rutas de prueba GET y POST.
 * - Gestión de errores:
 *    - 400 - Bad Request
 *    - 404 - Not Found
 *    - 500 - Internal Server Error
 * Diseño inspirado en:
 * Página de UNIVERSAE - https://universae.com/en/everything-leads-to-universae/ 
 */

// ==============================
//         IMPORTS
// ==============================

const express = require('express');

// ==============================
//       INITIALIZATION
// ==============================

// Initialize the app.
// Inicializando la app.
const app = express();

// Define the port where the server will listen.
// Defino el puerto donde escuchará el servidor.
const port = 3000;

// ==============================
//          MIDDLEWARES
// ==============================

// Serve static files from the "public" folder (image).
// Sirve archivos estáticos desde la carpeta "public" (imagen).
app.use(express.static('public'));

// Parse incoming JSON requests.
// Parsea solicitudes JSON entrantes.
app.use(express.json());

// Set EJS as the template engine.
// Configura EJS como motor de plantillas.
app.set('view engine', 'ejs');

// ==============================
//            ROUTES
// ==============================

// Home route (GET /).
// Displays a simple welcome homepage with logos and a message.
// Ruta de inicio (GET /).
// Muestra una página de bienvenida con logos y mensaje.
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Miri lleva UNIVERSAE a Azure</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
        <link rel="icon" href="https://universae.com/wp-content/uploads/2024/11/FP-FAVICON-NEGATIVO-3.png" type="image/png">
        <style>
          body { 
            background: 
              url('https://www.transparenttextures.com/patterns/cubes.png'),  
              linear-gradient(to bottom, rgb(39, 79, 165), rgb(54, 206, 193)); 
            background-repeat: repeat;
            background-size: auto; 
            font-family: 'Poppins', sans-serif; 
            text-align: center; 
            padding-top: 50px; 
            height: 100vh;
            margin: 0;
          }
          h1 { 
            color: rgb(39, 79, 165); 
            font-size: 55px;
            font-weight: 200; 
            margin-bottom: 50px;
            background-color: white; 
            padding: 20px 50px; 
            border-radius: 70px; 
            display: inline-block;
          }
          .logos {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            margin-bottom: 40px;
          }
          .logos img {
            width: 250px;
          }
          .universae-logo {
            width: 250px;
            height: 250px;
            object-fit: cover;
            border-radius: 50%; 
            overflow: hidden;     
          }
          p { 
            color: rgb(254, 254, 254); 
            font-size: 50px;
            font-weight: 200; 
          }
        </style>
      </head>
      <body>
      <h1>Hola desde Azure, Universae</h1>

       <div class="logos">
          <img class="universae-logo" src="/logo-universae.png" alt="Logo Universae" />
          <span style="font-size: 100px;">🤝</span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" alt="Logo Azure" />
        </div>

        <p>Miriam te da la bienvenida a este mini - microservicio</p>
      </body>
    </html>
  `);
});

// Greeting route (GET /saludo).
// Displays a personalized greeting using EJS templates.
// Ruta de saludo (GET /saludo).
// Muestra un saludo personalizado usando EJS.
app.get('/saludo', (req, res) => {
  const nombre = req.query.nombre || 'Universae';
  res.render('saludo', { nombre });
});

// Error simulation route (GET /ruta-erronea).
// Intentionally triggers a server error (500) for testing purposes.
// Ruta de simulación de error (GET /ruta-erronea).
// Provoca intencionalmente un error 500 para las pruebas.
app.get('/ruta-erronea', (req, res, next) => {
  const error = new Error('Error forzado para pruebas');
  next(error);
});

// Sum two numbers (POST /sumar).
// Accepts JSON input and returns the sum, rendered with EJS.
// Suma dos números (POST /sumar).
// Acepta datos JSON y devuelve la suma renderizada con EJS.
app.post('/sumar', (req, res) => {
  const { num1, num2 } = req.body;
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Los valores deben ser números' });
  }
  const resultado = num1 + num2;
  res.render('sumar', { resultado });
});

// ==============================
//      ERROR HANDLING
// ==============================

// Handle 500 Internal Server Error.
// Maneja el Error Interno 500.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno');
});

// Handle 404 Not Found Error (any unmatched route).
// Manejar Error 404 No Encontrado (rutas no coincidentes).
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});
// Alternatively, for a more RESTful style (returning JSON instead of plain text):
// res.status(404).json({ error: 'Page not found' });
// I didn't use it in this project because I prefer a more visual approach to responses.
// Otra opción para seguir un estilo más RESTful es (devolver JSON en lugar de texto plano):
// res.status(404).json({ error: 'Page not found' });
// No lo he utilizado en este proyecto porque he preferido un enfoque más visual para las respuestas.

// ==============================
//         SERVER START
// ==============================

// Start the server and listen on the defined port.
// Iniciar el servidor y escuchar en el puerto definido.
app.listen(port, () => {
  console.log(`Microservicio escuchando en http://localhost:${port}`);
});
// I'm using console.log here for simplicity, since this is a local tiny project.
// Utilizo console.log por simplicidad, ya que este es un mini proyecto local.


