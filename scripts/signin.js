const puppeteer = require('puppeteer');
const functions = require('./functions');

// connection account
puppeteer.launch({headless: false}).then(async browser => {
    let devices = functions.devices();
    let environment = functions.environment();

    // await Promise.all(devices.map(async (d) => {
        const page = await browser.newPage();
        await page.setViewport({ width: devices[1].width, height: devices[1].height })
        await page.goto(environment[0].url);
        await functions.closeModal(page, environment[0].name);
        await functions.signin(page, devices[1].name);
        await browser.close();
    // }));
});
