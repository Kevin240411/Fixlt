const app = require('./app'); // Importa la app que configuramos arriba

// Render asigna automáticamente process.env.PORT en producción (suele ser el 10000)
const PORT = process.env.PORT || 4000; 

app.listen(PORT, () => {
  console.log(`FixIt API listening on port ${PORT}`);
});