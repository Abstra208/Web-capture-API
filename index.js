const express = require('express');
const app = express();
const port = 5000;
const puppeteer = require('puppeteer');

app.listen(port, function(){
    console.log("Serveur")
});

app.get('/', (req, res) => {
  res.send("allo");
});

app.get('/screenshot', async (req, res) => {
    const url = req.query.url;
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    await page.goto(url);
  
    // Ajouter un délai de 5 secondes (5000 millisecondes)
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    const screenshot = await page.screenshot();
    await browser.close();
    res.set('Content-Type', 'image/png');
    res.send(screenshot);
});