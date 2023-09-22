import puppeteer from "puppeteer";
import fs from "fs"; 

//create and update json
function updateJson(arrayData) {
  if (fs.existsSync('scrapedData.json')) {
    const jsonData = fs.readFileSync('scrapedData.json', 'utf-8');
    const existingData = JSON.parse(jsonData);
    for (const newData of arrayData) {
      const existingIndex = existingData.findIndex(item => item.name === newData.name);
      if (existingIndex !== -1) {
        existingData[existingIndex] = newData;
      } else {
        existingData.push(newData);
      }
    }
    const updatedJsonData = JSON.stringify(existingData, null, 2);
    fs.writeFileSync('scrapedData.json', updatedJsonData);
  } else {
    const jsonData = JSON.stringify(arrayData, null, 2);
    fs.writeFileSync('scrapedData.json', jsonData);
  }
}


async function scrapEmpleosPublicos() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
  await page.goto('https://empleospublicos.cl/');

  await page.waitForSelector('.input-large');
  await page.type('.input-large', 'Informática y Sistemas');
  await page.waitForSelector('option[value="area13"]');

  const selectId = await page.evaluate(() => {
    return document.querySelector('#comboAreas').getAttribute('id');
  });
  await page.select(`#${selectId}`, 'area13');

  //Scraping data for cards
  await page.waitForSelector('.items.col-md-4.col-lg-4.area13');
  const cards = await page.evaluate(async () => {
    const cards = [];
    const cardElements = document.querySelectorAll('.items.col-md-4.col-lg-4.area13');
    
    function cutText(text, limit) {
        return text.replace(/\s+/g, ' ').slice(0, limit) + (text.length > limit ? "..." : "");
    }
    
    cardElements.forEach(async (element) => {
      const name = element.querySelector('h3 a') ? cutText(element.querySelector('h3 a').textContent, 132) : '';
      const location = element.querySelector('.cnt p:nth-child(2)') ? element.querySelector('.cnt p:nth-child(2)').textContent : '';
      const urlJob = element.querySelector('h3 a') ? element.querySelector('h3 a').getAttribute('href') : '';
      const publisher = urlJob ? urlJob.match(/https:\/\/[^/]+/) : '';
      const details = element.querySelector('p') ? element.querySelector('p').textContent : '';
      const detailsCut = details ? cutText(details, 132) : '';
      const logoPublisher = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Logotipo_del_sitio_web_del_Gobierno_de_Chile.png?20140925233501';
      const enterprise = element.querySelector('.cnt p:nth-child(1)') ? element.querySelector('.cnt p:nth-child(1)').textContent : '';
      const expirationDate = element.querySelector('.label.label-estado') ? element.querySelector('.label.label-estado').textContent.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/)[0] : '';
      cards.push({ name, location, urlJob, publisher,details,detailsCut,logoPublisher,enterprise,expirationDate });
    });
    
    return cards;
  });    
 
  updateJson(cards);
  await browser.close();

}

async function scrapEmpleosPublicos2() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);  
  await page.goto('https://empleospublicos.cl/');
  await page.waitForSelector('input#buscadorprincipal');
  await page.type('input#buscadorprincipal', 'desarrollador');
  
  await page.waitForSelector('span.typeahead__cancel-button', { visible: true });
  await page.click('.typeahead__button > button');
  await page.waitForSelector('.tag-busqueda');

  //scraping
  const visibleCardElements = await page.evaluate(() => {
    const visibleCards = [];
    const elements = document.querySelectorAll('.items:not([style*="display: none;"])');
    
    function cutText(text, limit) {
      return text.replace(/\s+/g, ' ').slice(0, limit) + (text.length > limit ? "..." : "");
    }
    
    elements.forEach(item => {
      const card = {};
      card.name = item.querySelector('h3 a') ? cutText(item.querySelector('h3 a').textContent, 132) : '';
      card.location = item.querySelector('.cnt p:nth-child(2)') ? item.querySelector('.cnt p:nth-child(2)').textContent : '';
      card.urlJob = item.querySelector('h3 a') ? item.querySelector('h3 a').getAttribute('href') : '';
      card.publisher = card.urlJob ? card.urlJob.match(/https:\/\/[^/]+/) : '';
      card.details = item.querySelector('p') ? item.querySelector('p').textContent : '';
      card.deatilsCut = card.details ? cutText(card.details, 132) : '';
      card.logoPublisher = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Logotipo_del_sitio_web_del_Gobierno_de_Chile.png?20140925233501';
      card.enterprise = item.querySelector('.cnt p:nth-child(1)') ? item.querySelector('.cnt p:nth-child(1)').textContent : '';
      card.expirationDate = item.querySelector('.label.label-estado') ? item.querySelector('.label.label-estado').textContent.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/)[0] : '';

      visibleCards.push(card);
    });

    return visibleCards;
  });

  await browser.close();

  updateJson(visibleCardElements);

}

async function scrapEmpleosPublicos3() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);  
  await page.goto('https://empleospublicos.cl/');
  await page.waitForSelector('input#buscadorprincipal');
  await page.type('input#buscadorprincipal', 'Informático');
  
  await page.waitForSelector('span.typeahead__cancel-button', { visible: true });
  await page.click('.typeahead__button > button');
  await page.waitForSelector('.tag-busqueda');

  //scraping
  const visibleCardElements = await page.evaluate(() => {
    const visibleCards = [];
    const elements = document.querySelectorAll('.items:not([style*="display: none;"])');
    
    function cutText(text, limit) {
      return text.replace(/\s+/g, ' ').slice(0, limit) + (text.length > limit ? "..." : "");
    }
    
    elements.forEach(item => {
      const card = {};
      card.name = item.querySelector('h3 a') ? cutText(item.querySelector('h3 a').textContent, 132) : '';
      card.location = item.querySelector('.cnt p:nth-child(2)') ? item.querySelector('.cnt p:nth-child(2)').textContent : '';
      card.urlJob = item.querySelector('h3 a') ? item.querySelector('h3 a').getAttribute('href') : '';
      card.publisher = card.urlJob ? card.urlJob.match(/https:\/\/[^/]+/) : '';
      card.details = item.querySelector('p') ? item.querySelector('p').textContent : '';
      card.deatilsCut = card.details ? cutText(card.details, 132) : '';
      card.logoPublisher = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Logotipo_del_sitio_web_del_Gobierno_de_Chile.png?20140925233501';
      card.enterprise = item.querySelector('.cnt p:nth-child(1)') ? item.querySelector('.cnt p:nth-child(1)').textContent : '';
      card.expirationDate = item.querySelector('.label.label-estado') ? item.querySelector('.label.label-estado').textContent.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/)[0] : '';

      visibleCards.push(card);
    });

    return visibleCards;
  });

  await browser.close();

  updateJson(visibleCardElements);

}




scrapEmpleosPublicos();
scrapEmpleosPublicos2();
scrapEmpleosPublicos3();


function printNamesWithIndexFromJsonFile() {
  if (fs.existsSync('scrapedData.json')) {
    const jsonData = fs.readFileSync('scrapedData.json', 'utf-8');
    const existingData = JSON.parse(jsonData);

    for (let i = 0; i < existingData.length; i++) {
      console.log(`[${i}] ${existingData[i].name}`);
    }
  }
}

printNamesWithIndexFromJsonFile();