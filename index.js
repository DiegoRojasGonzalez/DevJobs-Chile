const express = require('express');
//const fs = require('fs');
const scraper = require('./scrapingData'); // Importa las funciones de scraping desde scrapingData.js
const app = express();

app.get('/scraped-data', async (req, res) => {
    try {
      const scrapedData = await scraper.scrapeLogic(); // Usa scraper en lugar de scrapeLogic
      res.json(scrapedData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
});

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});