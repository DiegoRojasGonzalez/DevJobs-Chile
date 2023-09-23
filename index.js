const express = require('express');
const fs = require('fs');
const scraper = require('./scrapingData');
const app = express();
//scraper.scrapeLogic();


app.get('/scraped-data', async (req, res) => {
    try {
      console.log("Se va a ejecutar el scraping");
      const scrapedData = await scraper.scrapEmpleosPublicos(); // Asegúrate de que esta función devuelva datos en formato JSON o en el formato deseado
      console.log("Scraping completado");
  
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