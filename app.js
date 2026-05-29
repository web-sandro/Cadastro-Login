const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./routes/userRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar pasta pública para CSS
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use('/', userRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});