const puppeteer = require('puppeteer');
const functions = require('./functions');

// Create new account
puppeteer.launch({headless: false}).then(async browser => {
    let devices = functions.devices();
    let environment = functions.environment();

    // await Promise.all(devices.map(async (d) => {
        const page = await browser.newPage();
        await page.setViewport({width: devices[2].width, height: devices[2].height })
        await page.goto(environment[0].url);
        await functions.closeModal(page, environment[0].name);
        await functions.signin(page, devices[2].name);
        await functions.activation(page, devices[2].name, process.argv[2]);
        await page.waitForTimeout(30000);

        await browser.close();
    // })); 
});

// example :  node scripts/subscription.js personal GLPLAN1
