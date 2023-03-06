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
