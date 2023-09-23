const puppeteer = require("puppeteer");

async function scrapeLogic() {

  async function scrapEmpleosPublicos() {
    const browser = await puppeteer.launch({
      headless: false,
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
    await page.waitForSelector('div.items.area13[visible="true"][style*="display: block;"]');

    const visibleCardElements = await page.evaluate(() => {
      const visibleCards = [];
      const elements = document.querySelectorAll('div.items.area13[visible="true"][style*="display: block;"]');

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
        visibleCards.push(card);
      });
      return visibleCards;
    });
    await browser.close();
    return visibleCardElements;

  }
  
  async function scrapEmpleosPublicos2() {
    const browser = await puppeteer.launch({
      headless: false,
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
    await page.waitForSelector(".tag-busqueda");

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

        visibleCards.push(card);
      });

      return visibleCards;
    });
    await browser.close();
    return visibleCardElements;

  }

  async function scrapEmpleosPublicos3() {
    const browser = await puppeteer.launch({
      headless: false,
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
    await page.waitForSelector(".tag-busqueda");

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

        visibleCards.push(card);
      });

      return visibleCards;
    });

    await browser.close();
    return visibleCardElements;

  }
  //scrap functions 
  const scrapedData1 = await scrapEmpleosPublicos();
  const scrapedData2 = await scrapEmpleosPublicos2();
  const scrapedData3 = await scrapEmpleosPublicos3();

  

  const uniqueNames = new Set();

  function addUniqueObjects(dataArray) {
    dataArray.forEach((obj) => {
      if (!uniqueNames.has(obj.name)) {
        uniqueNames.add(obj.name);
        dataEmpleosPublicos.push(obj);
      }
    });
  }

  const dataEmpleosPublicos = [];

  addUniqueObjects(scrapedData1);
  addUniqueObjects(scrapedData2);
  addUniqueObjects(scrapedData3);

  return dataEmpleosPublicos;
}

module.exports = {
  scrapeLogic: scrapeLogic, // O simplemente scrapeLogic si así se llama la función
};