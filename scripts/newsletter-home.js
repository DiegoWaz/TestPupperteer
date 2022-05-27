const puppeteer = require('puppeteer');

const URL_SITE = env.process.URL_SITE;;
const SIZE_WIDTH = 1440;
const SIZE_HEIGHT = 1800;
const FIRSTNAME = env.process.FIRSTNAME;
const LASTNAME = env.process.LASTNAME;
const PASSWORD = env.process.PASSWORD;
const BIRTHDAY = env.process.BIRTHDAY;
const EMAIL = env.process.EMAIL;
const PHONE = env.process.PHONE;
const STREET_NUMBER = env.process.STREET_NUMBER;
const DATE = (new Date()).getTime();

// Create new account
puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();  
    await page.setViewport({ width: SIZE_WIDTH, height: SIZE_HEIGHT })   
    await page.goto(URL_SITE);
    await page.click('#didomi-notice-agree-button');
    await page.type('input#custom_subscriber_email_modal', EMAIL);
    await page.click('.newsletter__block button[type="submit"]');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "images/newsletter-1-" + DATE + ".png" });
    await browser.close();
});
