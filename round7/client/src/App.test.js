import puppeteer from 'puppeteer';
import React from 'react';

describe('<App />', () => {
  test('renders the blogs h1 title', async () => {
    let browser = await puppeteer.launch({});
    let page = await browser.newPage();

    await page.goto('http://localhost:3000');
    await page.waitForSelector('h1');

    const header = await page.$eval('h1', e => e.innerHTML);
    expect(header).toEqual('Blogs');

    browser.close();
  });

  test('login fails with invalid credentials', async () => {
    let browser = await puppeteer.launch({});
    let page = await browser.newPage();

    await page.goto('http://localhost:3000');
    await page.waitForSelector('h1');
    await page.click('.login-dialog-button');
    await page.waitForSelector('.login-modal');
    await page.type('#username', 'john');
    await page.type('#password', 'password');
    await page.click('.login-button');
    await page.waitForSelector('.notification');
    const result = await page.$eval('.notification', e => e.innerHTML);
    expect(result).toEqual('Invalid credentials');
    browser.close();
  });
});
