const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const express = require('express');
const app = express();
require('./config/database');

app.use(express.json());

// Import routes
const articleRoutes = require('./routes/articleRoutes');

// Routes
app.use('/api/articles', articleRoutes);

// Test
app.get('/', (req, res) => {
    res.send('API Blog fonctionne 🚀');
});

const PORT = 3000;
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});