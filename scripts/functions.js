const {prompt} = require('inquirer');
const EMAIL = env.process.EMAIL;
const FIRSTNAME = env.process.FIRSTNAME;
const LASTNAME = env.process.LASTNAME;
const PASSWORD = env.process.PASSWORD;
const BIRTHDAY = env.process.BIRTHDAY;
const PHONE = env.process.PHONE;
const STREET_NUMBER = env.process.STREET_NUMBER;
const ADDRESS = env.process.ADDRESS;
const ZIPCODE = env.process.ZIPCODE;
const CITY = env.process.CITY;
const COUNTRY = env.process.COUNTRY;
const SHORT_COUNTRY = env.process.SHORT_COUNTRY;
const DISCOUNT_CODE = env.process.DISCOUNT_CODE;
const DATE = (new Date()).getTime();
const CARD_NUMBER = env.process.CARD_NUMBER;
const CARD_NAME = env.process.CARD_NAME;
const CARD_MONTH = env.process.CARD_MONTH;
const CARD_YEAR = env.process.CARD_YEAR;
const CARD_CVC = env.process.CARD_CVC;
const GIFT_ACTIVATION = env.process.GIFT_ACTIVATION;
const SHIPPING_MODE = env.process.SHIPPING_MODE;

module.exports = {
    signin: async function(page, name) {
        await page.click('header .navbar__top-menu .modal__form');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: "images/signin-" + name + "-" + DATE + "-1.png" });
        await page.type('input#email', EMAIL);
        await page.type('input#password', PASSWORD);
        await page.click('.modal__login form[name="signin"] input[type="submit"]');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: "images/signin-" + name + "-" + DATE + "-2.png" });
        await page.waitForTimeout(1000);
    },
    signup: async function(page, name) {
        // let button = (name != "desktop") ? 'header .navbar__top-menu .modal__form' : 'header .navbar__top-menu .modal__form';

        await page.click('header .navbar__top-menu .modal__form');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: "images/signup-" + name + "-" + DATE + "-1.png" });
        await page.type('input#newEmail', EMAIL);
        await page.click('.modal__login form[name="signup"] input[type="submit"]');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: "images/signup-" + name + "-" + DATE + "-2.png" });
        await page.type('input#customer_firstName', FIRSTNAME);
        await page.type('input#customer_lastName', LASTNAME);
        await page.type('input#customer_emailConfirm', EMAIL);
        await page.type('input#customer_password', PASSWORD);
        await page.type('input#customer_birthday', BIRTHDAY);
        await page.click('#legalmentions');
        await page.click('input[type="submit"]');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: "images/signup-" + name + "-" + DATE + "-3.png" });
        await page.waitForTimeout(1000);
    },
    account: async function(page, name) {
        // let button = (name != "desktop") ? 'header .navbar__top-menu .modal__form' : 'header .navbar__top-menu .modal__form';

        await page.click('header .navbar__top-menu #myaccount');

        const btn = await page.$('#account-dashboard-page .card .btn-container a');
        await btn.evaluate(ba => ba.click());

        await page.screenshot({ path: "images/account-" + name + "-" + DATE + "-1.png" });
        await page.waitForTimeout(2000);
        await page.click('#account-subscription-details-page .card .btn-container a#' + name);
        await page.waitForTimeout(2000);
        await page.screenshot({ path: "images/account-" + name + "-" + DATE + "-2.png" });
        await page.click('#form-unsubscribe #radio_yes');
        await page.click('#form-unsubscribe input[type="submit"]');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: "images/account-" + name + "-" + DATE + "-3.png" });
        await page.click('#survey .wrapper-checkbox .radio1');
        await page.click('input[type="submit"]');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: "images/account-" + name + "-" + DATE + "-4.png" });

        //     await page.screenshot({ path: "images/signup-" + name + "-" + DATE + "-1.png" });
        //     await page.type('input#newEmail', EMAIL);
        //     await page.click('.modal__login form[name="signup"] input[type="submit"]');
        //     await page.waitForTimeout(2000);
        //     await page.screenshot({ path: "images/signup-" + name + "-" + DATE + "-2.png" });
        //     await page.type('input#customer_firstName', FIRSTNAME);
        //     await page.type('input#customer_lastName', LASTNAME);
        //     await page.type('input#customer_emailConfirm', EMAIL);
        //     await page.type('input#customer_password', PASSWORD);
        //     await page.type('input#customer_birthday', BIRTHDAY);
        //     await page.click('#legalmentions');
        //     await page.click('input[type="submit"]');
        //     await page.waitForTimeout(2000);
        //     await page.screenshot({ path: "images/signup-" + name + "-" + DATE + "-3.png" });
        //     await page.waitForTimeout(1000);
    },
    subscription: async function(page, device, questions) {
        prompt(questions).then(async answers => {
            let subType = (answers.type == "gift") ? "black" : "red";
            let button = (device != "desktop") ? ".sticky-button a.btn-" + subType : ".homepage__concept__container__block .btn-" + subType;
    
            if (answers.type == "oneshot") {
                button = ".homepage__shop__block__products__list a[data-name=" + answers.sku + "]";
            }

            const pageClick = await page.$(button);
            await pageClick.evaluate(pc => pc.click());
    
            await page.screenshot({ path: "images/creation-" + device + "-" + DATE + "-1.png" });
            await page.waitForTimeout(2000);
    
            const sub = await page.$("#" + answers.type + " .card .btn-container a[data-name=" + answers.sku + "]");
            await sub.evaluate(su => su.click());
    
            await page.screenshot({ path: "images/creation-" + device + "-" + DATE + "-2.png" });
            await page.waitForTimeout(1000);
    
            let delivery = (answers.type == "gift") ? "invoice" : "delivery";
            await this.formDelivery(page, delivery, answers.type, SHIPPING_MODE, SHORT_COUNTRY);
    
            await page.screenshot({ path: "images/creation-" + device + "-" + DATE + "-3.png" });
            await page.waitForTimeout(2000);
    
            const checkbox = await page.$('.wrapper__mobile .checkbox-content input#terms');
            await checkbox.evaluate(ch => ch.click());
    
            const btn = await page.$('.btn-container input#submit-validation-form');
            await btn.evaluate(ba => ba.click());
    
            await page.waitForTimeout(1000);
            await page.screenshot({ path: "images/creation-" + device + "-" + DATE + "-4.png" });
            
            await page.waitForTimeout(2000);
            await this.payment(page);
    
            await page.screenshot({ path: "images/creation-" + device + "-" + DATE + "-5.png" });
            await page.waitForTimeout(1000);
            await page.screenshot({ path: "images/creation-" + device + "-" + DATE + "-6.png" });
            await page.waitForTimeout(1000);
    
            if (answers.type == "personal") {
                await page.click('.card__trash .close');
                await page.screenshot({ path: "images/creation-" + device + "-" + DATE + "-7.png" });   
            }
        });
    },
    activation: async function(page, device, code) {
        let button = (device != "desktop") ? ".sticky-button a.btn-black" : ".homepage__concept__container__block .btn-black";
        let pageClick = await page.$(button);

        await pageClick.evaluate(pc => pc.click());
        await page.waitForTimeout(1000);
        await page.screenshot({ path: "images/activation-" + DATE + "-1.png" });
        await page.type('input#form_reference', code);

        const input = await page.$('.form-subscription-wrapper input[type="submit"]');
        await input.evaluate(i => i.click());
        
        await page.waitForTimeout(1000);
        await page.screenshot({ path: "images/activation-" + DATE + "-2.png" });
        await page.waitForTimeout(1000);
        await this.formDelivery(page, "delivery", "", SHIPPING_MODE, SHORT_COUNTRY);
        await page.waitForTimeout(1000);
        await page.screenshot({ path: "images/activation-" + device + "-" + DATE + "-4.png" });

        const btn = await page.$('.btn-container #activate-gift-submit');
        await btn.evaluate(ba => ba.click());

        await page.screenshot({ path: "images/activation-" + device + "-" + DATE + "-6.png" });

        await page.waitForTimeout(2000);
        await this.payment(page);

        await page.click('.card__trash .close');
        await page.waitForTimeout(2000);
    },
    formDelivery: async function(page, delivery, type, shipping, country) {
        let tag = `#subscription_${delivery}Contact_`;

        const toggle = await page.$('#' + delivery + '-address .address-toggle a');
        await toggle.evaluate(tgl => tgl.click());

        await page.type('input' + tag + 'streetNumber', STREET_NUMBER);
        await page.type('input' + tag + 'addressFirstLine', ADDRESS);
        await page.type('input' + tag + 'addressZipCode', ZIPCODE);
        await page.type('input' + tag + 'addressCity', CITY);
        await page.type('select' + tag + 'addressCountryCode', COUNTRY);

        if (type == "personal") {
            let shippingMode = (shipping == "standard") ? 'asendia_code_0' : 'colissimo_code_code_0';

            const btnShipping = await page.$(".shipping-modes .list-card__option__label input#subscription_" + country + "_" + shippingMode);
            await btnShipping.evaluate(bt => bt.click());
        }

        await page.type('input' + tag + 'phoneNumber', PHONE);
        // await page.type('input' + tag + 'discount', DISCOUNT_CODE);

        const input = await page.$("input#submit-creation-form");
        await input.evaluate(i => i.click());
    },
    payment: async function(page) {
        await page.type('input[id="card.cardNumber"]', CARD_NUMBER);
        await page.type('input[id="card.cardHolderName"]', CARD_NAME);
        await page.type('select[id="card.expiryMonth"]', CARD_MONTH);
        await page.type('select[id="card.expiryYear"]', CARD_YEAR);
        await page.type('input[id="card.cvcCode"]', CARD_CVC);
        await page.click('.basetable input[type="submit"].paySubmit');
    },
    closeModal: async function(page, env) {
        if (env == "prod") await page.click('#didomi-notice-agree-button');
        await page.click('.modal__newsletter .close');
    },
    devices: function() {
        return [
            {"name": "mobile", "width": 375, "height": 667},
            {"name": "tablet", "width": 768, "height": 1024},
            {"name": "desktop", "width": 1440, "height": 961}
        ];
    },
    environment: function() {
        return [
            {"name": "dev", "url": env.process.URL_DEV },
            {"name": "staging", "url": env.process.URL_STAGING },
            {"name": "prod", "url": env.process.URL_PROD }
        ];
    }
  };
  