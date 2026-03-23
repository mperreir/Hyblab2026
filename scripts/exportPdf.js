#!/usr/bin/env node
const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));

async function run() {
  const url = argv.url || argv.u || 'http://localhost:5173';
  const out = argv.out || argv.o || 'output.pdf';
  const format = argv.format || 'A4';

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: out,
    format,
    displayHeaderFooter: false,
    printBackground: true,
  });
  await browser.close();
  console.log(`Saved PDF to ${out}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
