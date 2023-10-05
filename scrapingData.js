const puppeteer = require("puppeteer");

async function scrapeLogic() {
  
  async function scrapEmpleosPublicos() {
    const browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.goto("https://empleospublicos.cl/");
    await page.waitForSelector('input#comboAreascomboAreasId');
    const inputElement = await page.$('input#comboAreascomboAreasId');
    await inputElement.type('Informática y Sistemas');
    await page.waitForSelector('#principal > div > div > div.col-md-3.sidebar-teee > div.filtro-fila.row.filtros-mobile.hidden-xs > div > div > div > ul > li > a');
    const anchorElement = await page.$('#principal > div > div > div.col-md-3.sidebar-teee > div.filtro-fila.row.filtros-mobile.hidden-xs > div > div > div > ul > li > a');
    await anchorElement.click();
    const maxWaitTime = 30000;

    try {
      await Promise.race([
        page.waitForSelector('div.items.area13'),
        new Promise((_, reject) => setTimeout(() => reject('Tiempo de espera agotado'), maxWaitTime))
      ]);

    const visibleCardElements = await page.evaluate(() => {
      const visibleCards = [];
      const elements = document.querySelectorAll('div.items.area13');

      function cutText(text, limit) {
        return (
          text.replace(/\s+/g, " ").slice(0, limit) +
          (text.length > limit ? "..." : "")
        );
      }

      elements.forEach((item) => {
        const card = {};
        card.name = item.querySelector("h3 a")
          ? cutText(item.querySelector("h3 a").textContent, 132)
          : "";
        card.location = item.querySelector(".cnt p:nth-child(2)")
          ? item.querySelector(".cnt p:nth-child(2)").textContent
          : "";
        card.urlJob = item.querySelector("h3 a")
          ? item.querySelector("h3 a").getAttribute("href")
          : "";
        card.publisher = card.urlJob
          ? card.urlJob.match(/https:\/\/[^/]+/)
          : "";
        card.details = item.querySelector("p")
          ? item.querySelector("p").textContent
          : "";
        card.deatilsCut = card.details ? cutText(card.details, 132) : "";
        card.logoPublisher =
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/Logotipo_del_sitio_web_del_Gobierno_de_Chile.png?20140925233501";
        card.enterprise = item.querySelector(".cnt p:nth-child(1)")
          ? item.querySelector(".cnt p:nth-child(1)").textContent
          : "";
        card.expirationDate = item.querySelector(".label.label-estado")
          ? item
              .querySelector(".label.label-estado")
              .textContent.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/)[0]
          : "";
        card.publicationDate = '';
        visibleCards.push(card);
      });
      return visibleCards;
    });
    await browser.close();
    return visibleCardElements;
    } catch (error) {
      console.error('Error:', error);
      await browser.close();
      return null;
    }

  }
/*
  async function scrapEmpleosPublicos2() {
    const browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.goto("https://empleospublicos.cl/");
    await page.waitForSelector("input#buscadorprincipal");
    await page.type("input#buscadorprincipal", "desarrollador");

    await page.waitForSelector("span.typeahead__cancel-button", {
      visible: true,
    });
    await page.click(".typeahead__button > button");
    const maxWaitTime = 30000;

    try {
      await Promise.race([
        page.waitForSelector(".tag-busqueda"),
        new Promise((_, reject) => setTimeout(() => reject('Tiempo de espera agotado'), maxWaitTime))
      ]);
    
    //scraping
    const visibleCardElements = await page.evaluate(() => {
      const visibleCards = [];
      const elements = document.querySelectorAll(
        '.items:not([style*="display: none;"])'
      );

      function cutText(text, limit) {
        return (
          text.replace(/\s+/g, " ").slice(0, limit) +
          (text.length > limit ? "..." : "")
        );
      }

      elements.forEach((item) => {
        const card = {};
        card.name = item.querySelector("h3 a")
          ? cutText(item.querySelector("h3 a").textContent, 132)
          : "";
        card.location = item.querySelector(".cnt p:nth-child(2)")
          ? item.querySelector(".cnt p:nth-child(2)").textContent
          : "";
        card.urlJob = item.querySelector("h3 a")
          ? item.querySelector("h3 a").getAttribute("href")
          : "";
        card.publisher = card.urlJob
          ? card.urlJob.match(/https:\/\/[^/]+/)
          : "";
        card.details = item.querySelector("p")
          ? item.querySelector("p").textContent
          : "";
        card.deatilsCut = card.details ? cutText(card.details, 132) : "";
        card.logoPublisher =
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/Logotipo_del_sitio_web_del_Gobierno_de_Chile.png?20140925233501";
        card.enterprise = item.querySelector(".cnt p:nth-child(1)")
          ? item.querySelector(".cnt p:nth-child(1)").textContent
          : "";
        card.expirationDate = item.querySelector(".label.label-estado")
          ? item
              .querySelector(".label.label-estado")
              .textContent.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/)[0]
          : "";
        card.publicationDate = '';


        visibleCards.push(card);
      });

      return visibleCards;
    });
    await browser.close();
    return visibleCardElements;
    } catch (error) {
      console.error('Error:', error);
      await browser.close();
      return null;
    }
  }

  async function scrapEmpleosPublicos3() {
    const browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.goto("https://empleospublicos.cl/");
    await page.waitForSelector("input#buscadorprincipal");
    await page.type("input#buscadorprincipal", "Informático");

    await page.waitForSelector("span.typeahead__cancel-button", {
      visible: true,
    });
    await page.click(".typeahead__button > button");
    const maxWaitTime = 30000;

    try {
      await Promise.race([
        page.waitForSelector(".tag-busqueda"),
        new Promise((_, reject) => setTimeout(() => reject('Tiempo de espera agotado'), maxWaitTime))
      ]);
    //scraping
    const visibleCardElements = await page.evaluate(() => {
      const visibleCards = [];
      const elements = document.querySelectorAll(
        '.items:not([style*="display: none;"])'
      );

      function cutText(text, limit) {
        return (
          text.replace(/\s+/g, " ").slice(0, limit) +
          (text.length > limit ? "..." : "")
        );
      }

      elements.forEach((item) => {
        const card = {};
        card.name = item.querySelector("h3 a")
          ? cutText(item.querySelector("h3 a").textContent, 132)
          : "";
        card.location = item.querySelector(".cnt p:nth-child(2)")
          ? item.querySelector(".cnt p:nth-child(2)").textContent
          : "";
        card.urlJob = item.querySelector("h3 a")
          ? item.querySelector("h3 a").getAttribute("href")
          : "";
        card.publisher = card.urlJob
          ? card.urlJob.match(/https:\/\/[^/]+/)
          : "";
        card.details = item.querySelector("p")
          ? item.querySelector("p").textContent
          : "";
        card.deatilsCut = card.details ? cutText(card.details, 132) : "";
        card.logoPublisher =
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/Logotipo_del_sitio_web_del_Gobierno_de_Chile.png?20140925233501";
        card.enterprise = item.querySelector(".cnt p:nth-child(1)")
          ? item.querySelector(".cnt p:nth-child(1)").textContent
          : "";
        card.expirationDate = item.querySelector(".label.label-estado")
          ? item
              .querySelector(".label.label-estado")
              .textContent.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/)[0]
          : "";
        card.publicationDate = '';


        visibleCards.push(card);
      });

      return visibleCards;
    });

    await browser.close();
    return visibleCardElements;
    } catch (error) {
      console.error('Error:', error);
      await browser.close();
      return null;
    }
  }
*/
  async function scrapLinkdin(){
      const browser = await puppeteer.launch({
        headless: "new"
      });
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(60000);
      await page.goto("https://cl.linkedin.com/jobs/programador-empleos?position=1&pageNum=0");
      
      // Espera a que los elementos sean visibles
      const maxWaitTime = 30000;

      try {
        await Promise.race([
          page.waitForSelector('.jobs-search__results-list'),
          new Promise((_, reject) => setTimeout(() => reject('Tiempo de espera agotado'), maxWaitTime))
        ]);
    
    // Utiliza evaluate para extraer los datos de las tarjetas "base-card"
    const data = await page.evaluate(() => {
      const ul = document.querySelector('.jobs-search__results-list');
      const cardList = ul.querySelectorAll('li div.base-card');
      const cardData = [];
      
      cardList.forEach(card => {
        const anchor = card.querySelector('a.base-card__full-link') || '';
        const name = card.querySelector('.base-search-card__title') || '';
        const enterprise = card.querySelector('a.hidden-nested-link') || '';
        const location = card.querySelector('.job-search-card__location') || 'Desconocido';
        let locationShort = '';
        if (location.textContent.includes('Santiago') || location.textContent.includes('Chile')) {
          locationShort = 'Santiago';
        }
        const details = card.querySelector('.result-benefits__text') || '';
        const timeElement = card.querySelector('.job-search-card__listdate');
        const publisher = 'https://www.linkedin.com';
        const logoPublisher = 'https://th.bing.com/th/id/OIP.b5oDvUVU5UVN4cefTJGq3wHaHa?pid=ImgDet&rs=1';
        let dateText = '';
        
        if (timeElement) {
          const dateTime = timeElement.getAttribute('datetime');
          dateText = dateTime.split("T")[0];
        }

        if (anchor && name && enterprise && location) {
          const locationText = location.textContent.trim().split(',')[0]; 

          const cardInfo = {
            name: name.textContent.trim(),
            location: locationShort,
            urlJob: anchor.getAttribute('href'),
            publisher: publisher,
            details: details ? details.textContent.trim() : '',
            detailsCut: details ? details.textContent.trim() : '',
            logoPublisher: logoPublisher,
            enterprise: enterprise.textContent.trim(),
            expirationDate: '',
            publicationDate: dateText,
          };
          cardData.push(cardInfo);
        }
      });
      
      return cardData;
    });

    await browser.close();
    return data
    } catch (error) {
      console.error('Error:', error);
      await browser.close();
      return null;
    }
  }
/*
  async function scrapCompuTrabajo(){
  
    const browser = await puppeteer.launch({
      headless: "new"
    });
  
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.goto("https://cl.computrabajo.com/trabajo-de-programador");  
    const maxWaitTime = 60000;

    try {
      await Promise.race([
      page.waitForSelector('.box_offer'),
      
        new Promise((_, reject) => setTimeout(() => reject('Tiempo de espera agotado'), maxWaitTime))
      ]);
      const articles = await page.$$('.box_offer');

      const articleData = [];

      for (const article of articles) {
        const name = await article.$eval('h2.fs18 a', (a) => a.textContent.trim() || '');
        let location = await article.$eval('p.fs16.fc_base.mt5.mb5', (p) => {
          const text = p.textContent.trim();
          const locationParts = text.split('\n'); // Dividir el texto en líneas
          const lastLine = locationParts[locationParts.length - 1].trim(); // Obtener la última línea (ubicación) y eliminar espacios en blanco adicionales
          if (lastLine.includes('Santiago')) {
            return 'Santiago';
          } else {
            return lastLine;
          }
        });
        const url = await article.$eval('h2.fs18 a', (a) => a.getAttribute('href') || '');
        const urlJob = 'https://cl.computrabajo.com' + url;

        const publisher = 'https://cl.computrabajo.com';
        const details = await article.$eval('div.list_dot.mb5.mrB', (div) => div.textContent.trim().replace(/\s+/g, ' ') || '');
        const detailsCut = '';
        const logoPublisher = 'https://media-exp2.licdn.com/dms/image/C4E0BAQG_OEsCOrplZA/company-logo_200_200/0/1639640793918?e=2147483647&v=beta&t=rBg-umDIGY6_ALxG6yUN4g6YzNLNzAvcNc8JFkG0bvo';
        const company = await article.$eval('a.fc_base:not(.js-o-link) ', (a) => a.textContent.trim().replace(/\s+/g, ' ') || '');
        const enterprise = company.includes('Postular') ? 'Desconocido' : company; 
        const expirationDate ='';
        const publicationDate ='';
        const articleInfo = {
          name,
          location,
          urlJob,
          publisher,
          details,
          detailsCut,
          logoPublisher,
          enterprise,
          expirationDate,
          publicationDate
        };
        
        articleData.push(articleInfo);
      }
      await browser.close();
      return articleData;
      

    } catch (error) {
      console.error('Error:', error);
      await browser.close();
      return null;
    }
    
  }

  async function scrapCompuTrabajo2(){
    const browser = await puppeteer.launch({headless: false});
  

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.goto("https://cl.computrabajo.com/trabajo-de-programador?p=2");  
    const maxWaitTime = 60000;

    try {
      await Promise.race([
      page.waitForSelector('.box_offer'),
      
        new Promise((_, reject) => setTimeout(() => reject('Tiempo de espera agotado'), maxWaitTime))
      ]);
      const articles = await page.$$('.box_offer');

      const articleData = [];
      for (const article of articles) {
        const name = await article.$eval('h2.fs18 a', (a) => a.textContent.trim() || '');
        let location = await article.$eval('p.fs16.fc_base.mt5.mb5', (p) => {
          const text = p.textContent.trim();
          const locationParts = text.split('\n'); // Dividir el texto en líneas
          const lastLine = locationParts[locationParts.length - 1].trim(); // Obtener la última línea (ubicación) y eliminar espacios en blanco adicionales
          if (lastLine.includes('Santiago')) {
            return 'Santiago';
          } else {
            return lastLine;
          }
        });
        const url = await article.$eval('h2.fs18 a', (a) => a.getAttribute('href') || '');
        const urlJob = 'https://cl.computrabajo.com' + url;
        const publisher = 'https://cl.computrabajo.com';
        const details = await article.$eval('div.list_dot.mb5.mrB', (div) => div.textContent.trim().replace(/\s+/g, ' ') || '');
        const detailsCut = '';
        const logoPublisher = 'https://media-exp2.licdn.com/dms/image/C4E0BAQG_OEsCOrplZA/company-logo_200_200/0/1639640793918?e=2147483647&v=beta&t=rBg-umDIGY6_ALxG6yUN4g6YzNLNzAvcNc8JFkG0bvo';
        const company = await article.$eval('a.fc_base:not(.js-o-link) ', (a) => a.textContent.trim().replace(/\s+/g, ' ') || '');
        const enterprise = company.includes('Postular') ? 'Desconocido' : company; 
        const expirationDate ='';
        const publicationDate ='';
        const articleInfo = {
          name,
          location,
          urlJob,
          publisher,
          details,
          detailsCut,
          logoPublisher,
          enterprise,
          expirationDate,
          publicationDate
        };
        
        articleData.push(articleInfo);
      }
      await browser.close();
      return articleData;
      

    } catch (error) {
      console.error('Error:', error);
      await browser.close();
      return null;
    }
    
  }

*/


  function addUniqueObjects(dataArray) {
    dataArray.forEach((obj) => {
      const isDuplicate = dataEmpleosPublicos.some((existingObj) => {
        return existingObj.name === obj.name && existingObj.publisher === obj.publisher;
      });
  
      if (!isDuplicate) {
        dataEmpleosPublicos.push(obj);
      }
    });
  }
  
  let scrapedData1; let scrapedData2;let scrapedData3;let scrapedData4;let scrapedData5;let scrapedData6;
  const dataEmpleosPublicos = [];

  if ((scrapedData1 = await scrapEmpleosPublicos()) !== null) {
    addUniqueObjects(scrapedData1);
  }
/*
  if ((scrapedData2 = await scrapEmpleosPublicos2()) !== null) {
    addUniqueObjects(scrapedData2);
  }

  if ((scrapedData3 = await scrapEmpleosPublicos3()) !== null) {
    addUniqueObjects(scrapedData3);
  }
*/
  if ((scrapedData4 = await scrapLinkdin()) !== null) {
    addUniqueObjects(scrapedData4);
  }
/*
  
  if ((scrapedData5 = await scrapCompuTrabajo()) !== null) {
    addUniqueObjects(scrapedData5);
  }
  if ((scrapedData6 = await scrapCompuTrabajo2()) !== null) {
    addUniqueObjects(scrapedData6);
  }
*/

  function addUniqueObjects(dataArray) {
    dataArray.forEach((obj) => {
      const isDuplicate = dataEmpleosPublicos.some((existingObj) => {
        return existingObj.name === obj.name && existingObj.publisher === obj.publisher;
      });
  
      if (!isDuplicate) {
        dataEmpleosPublicos.push(obj);
      }
    });
  }

  return dataEmpleosPublicos;

}

module.exports = {
  scrapeLogic: scrapeLogic, 
};