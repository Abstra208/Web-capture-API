const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const puppeteer = require('puppeteer');

app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot();
  await browser.close();
  res.set('Content-Type', 'image/png');
  res.send(screenshot);
});

app.get('/', async (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <section>
            <h1>bonjours</h1>
        </section>
    </body>
    </html>
  `)
});