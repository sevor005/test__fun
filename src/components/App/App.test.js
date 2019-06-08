import puppeteer from "puppeteer";
// import React from 'react';
// import RouteList from './RouteList';
// import { shallow, mount } from 'enzyme';
// import RoutePointCreater from '../RoutePointCreater/RoutePointCreater.js';
// import PointsList from '../PointsList/PointsList';
// import MarkerList from '../MarkerList/MarkerList';
// import RouteFooter from '../RouteFooter/RouteFooter';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import RoutePoint from "../RoutePoint/RoutePoint";

// configure({ adapter: new Adapter() });

let page;
let browser;
const width = 1920;
const height = 1080;
const urlPage = 'http://localhost:3000';
const timeout = 14000;

beforeAll(async () => {
  jest.setTimeout(20000);
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();

  try {
    await page.goto(urlPage);
    console.log(`Открываю страницу ${urlPage}`)
  }
  catch(error) {
    console.log(`Не удалось открыть страницу ${urlPage} из-за ошибки ${error}`)
  };

  await page.setViewport({ width, height });
});

describe('Main', () => {

  it('компонент Main присутствует на странице', async () => {
    const selector = '[class*="main"]';
    await page.waitForSelector(selector);
  }, timeout);

  it('добавление элемента в список работает', async () => {
    const selectorInput = '[class*="input"]';
    const selectorPoint = '[class*="point"]';

    await page.type(selectorInput, 'Marker 1');
    await page.keyboard.press('Enter');
    await page.waitForSelector(selectorPoint);

    await page.type(selectorInput, 'Marker 2');
    await page.keyboard.press('Enter');
    await page.waitForSelector(selectorPoint);

    await page.type(selectorInput, 'Marker 3');
    await page.keyboard.press('Enter');
    await page.waitForSelector(selectorPoint);
  });

  // it('удаление из списка работает', async () => {

  // });

  // it('Drag-and-Drop списка работает', async () => {

  // });

}, timeout);

afterAll(() => {
  browser.close();
});
