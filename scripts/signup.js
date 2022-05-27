const puppeteer = require('puppeteer');
const functions = require('./functions');
const URL_SITE = env.process.URL_SITE;
const ENVIRONMENT = env.process.ENVIRONMENT;

// connection account
puppeteer.launch({headless: false}).then(async browser => {
    let devices = functions.devices();
    let environment = functions.environment();

    // await Promise.all(devices.map(async (d) => {
        const page = await browser.newPage();
        await page.setViewport({width: devices[1].width, height: devices[1].height })
        await page.goto(environment[0].url);
        await functions.closeModal(page, environment[0].name);
        await functions.signup(page, devices[1].name);
        await browser.close();
    // }));
});
