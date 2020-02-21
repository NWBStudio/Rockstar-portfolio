import faker from "faker";
import puppeteer from "puppeteer";

const APP = "http://localhost:8080/admin#/login";

const fakeUser = {
  login: faker.internet.userName(),
  password: faker.internet.password(),
};


let page;
let browser;


beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 80,
  });
  page = await browser.newPage();
});
afterAll(() => {
  browser.close();
});

describe("Login form", () => {
  test("Submit btn is exist", async () => {
    const submitBtn = await page.$eval(".form__submit-btn", el =>(el ? true : false));
    expect(submitBtn).toBe(true);
  });
});