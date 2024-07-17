const express = require('express');
const path = require('path');

const app = express();

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal: enviar un archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
