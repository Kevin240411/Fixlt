const express = require('express');
const cors = require('cors');
// Importa tus enrutadores reales aquí cuando los tengas listos, por ejemplo:
// const authRoutes = require('./routes/auth'); 

const app = express();

// Configuración de CORS para tu frontend
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());

// RUTA RAÍZ: Esto quitará el "Cannot GET /" y confirmará que todo sirve
app.get('/', (req, res) => {
  res.json({ 
    status: "success",
    message: "¡El backend de FixIt está respondiendo en producción! 🚀" 
  });
});

// Enlaza tus rutas aquí (ejemplo):
// app.use('/api/auth', authRoutes);

module.exports = app;