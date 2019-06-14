import puppeteer from "puppeteer";

let page;
let browser;
const width = 1920;
const height = 1080;
const urlPage = 'http://localhost:3000';
const timeout = 14000;

const selectorMain = '[class*="main"]';
const selectorInput = '[class*="input"]';
const selectorPoint = '[class*="point"]';
const selectorBtnAddPoint = '[class*="button"]';
const selectorBtnDeletePoint = '[class*="deleteImg"]';
const selectorBtnAllClear = '[class*="clearCompleted"]';

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
    await page.waitForSelector(selectorMain);
  }, timeout);

  it('добавление элемента в список работает', async () => {
    await page.type(selectorInput, 'Point 1');
    await page.keyboard.press('Enter');
    await page.waitForSelector(selectorPoint);

    await page.type(selectorInput, 'Point 2');
    await page.click(selectorBtnAddPoint);
    await page.waitForSelector(selectorPoint);
  }, timeout);

  it('удаление из списка работает', async () => {
    await page.click(selectorBtnDeletePoint);

    const pointTitle = await page.$eval(selectorPoint, el => el.textContent);
    expect(pointTitle).toEqual('Point 2');
  }, timeout);

  it('Drag-and-Drop списка работает', async () => {
    await page.click(selectorBtnDeletePoint);

    await page.type(selectorInput, 'Point 1');
    await page.keyboard.press('Enter');
    await page.waitForSelector(selectorPoint);

    await page.type(selectorInput, 'Point 2');
    await page.keyboard.press('Enter');
    await page.waitForSelector(selectorPoint);

    const ele1 = await page.$(selectorPoint);
    const box1 = await ele1.boundingBox();
    const ele2 = await page.$(selectorPoint);
    const box2 = await ele2.boundingBox();
    await page.mouse.move((parseInt(box1.x) + 5), (parseInt(box1.y) + 10));
    await page.mouse.down();
    await page.mouse.move(box2.x + 5, box2.y + box1.height, {steps: 10});
    await page.mouse.up();
    await page.focus(selectorPoint+':first-child');

    const firstPoint = await page.$eval(selectorPoint+':first-child', el => el.textContent);

    expect(firstPoint).toEqual('Point 2');
  }, timeout);

  it('удаление всех элементов работает', async () => {
    await page.type(selectorInput, 'Point 3');
    await page.click(selectorBtnAddPoint);
    await page.waitForSelector(selectorPoint);

    await page.type(selectorInput, 'Point 4');
    await page.click(selectorBtnAddPoint);
    await page.waitForSelector(selectorPoint);

    await page.click(selectorBtnAllClear);

    const pointTitle = await page.$eval(selectorPoint, el => el.textContent);
    expect(pointTitle).toEqual('');
  }, timeout);
});

afterAll(() => {
  browser.close();
});
