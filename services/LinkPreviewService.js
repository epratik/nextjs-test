
const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");

export class LinkPreviewService   {
    browser = undefined;

    constructor(
    ) { 
        console.log('creating browser instance...')
        puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] }).then((obj) => {
            this.browser = obj;
        });
        puppeteer.use(pluginStealth());
        console.log('browser instance ready...')
    }

    getMetaData = async (url) => {

        try {

            let title = "";
            let siteName = "";
            let images= [];
            let favicons = [];

            const page = await this.browser.newPage();
            page.setUserAgent("facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)");
            await page.goto(url);
            await page.waitForSelector('meta');
            let data = await this.readTags(page);            
            await page.close();

            const preview = {
                title: data.title,
                siteName: data.description,
                images: [data.imgUrl]
            }

            return preview;
        }
        catch (err) {
            if (this.browser)
                await this.browser.close();
            throw err;
        }
    }

    #readTags = async (page) => {
        let preview = {};

        const img = await page.evaluate(async () => {
            const metas = document.getElementsByTagName('meta');
            for (let i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute('property') == 'og:image') {
                    preview.imgUrl = metas[i].getAttribute('content');
                }

                if (metas[i].getAttribute('property') == 'og:description') {
                    preview.description = metas[i].getAttribute('content');
                }

                if (metas[i].getAttribute('property') == 'og:title') {
                    preview.title = metas[i].getAttribute('content');
                }
            }
            return preview;
        });
        return img;
    };    
}