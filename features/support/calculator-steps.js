const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const assert = require('assert');

const {Builder, Key, until} = require('selenium-webdriver');
const {Given, When, Then, setDefaultTimeout}  = require('cucumber');

const BASE_URL        = 'https://www.online-calculator.com/full-screen-calculator/';
const TITLE_TEXT      = 'Full Screen Calculator - Online Calculator';
const DEFAULT_TIMEOUT = 2000;

setDefaultTimeout(60000); // Default timeout of 1 minute
  
Given('Open browser and start application', async function () {
  this.driver = await new Builder().forBrowser('chrome').build();

  await this.driver.get(BASE_URL);
  await this.driver.wait(until.titleIs(TITLE_TEXT), DEFAULT_TIMEOUT);

  await this.driver.switchTo().frame(0);
});

When('I input number {string}', async function (inputNum) {
  let drv = this.driver;
  let action = drv.actions();
  let arr = inputNum.split("");

  for (const [_, char] of arr.entries()) {
    await action.sendKeys(char);
  }

  await action.perform();
  await drv.sleep(DEFAULT_TIMEOUT)
});

When('I choose {string} operation', async function (operation) {
  let action = await this.driver.actions();

  switch(operation) {
    case "substract":
      await action.sendKeys("-").perform();
      break;
    case "divide":
      await action.sendKeys("/").perform();
      break;
    default:
      await action.sendKeys("-").perform();
  }
  await this.driver.sleep(DEFAULT_TIMEOUT);
})

When('I see the result', async function () {
  let action = await this.driver.actions();

  await action.sendKeys(Key.ENTER).perform();
  await this.driver.sleep(DEFAULT_TIMEOUT);
})

Then('Result should be {string}', async function (result) {
  let rawData = await this.driver.takeScreenshot();
  let data = await rawData.substring(0, 10000); // Sampling first 10kb

})

Then('close the browser', async function () {
  await this.driver.quit();
});
