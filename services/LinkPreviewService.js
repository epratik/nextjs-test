
const puppeteer = require("puppeteer");
// const pluginStealth = require("puppeteer-extra-plugin-stealth");

export class LinkPreviewService   {
    browser = undefined;

    constructor(
    ) { 
        return (async () => {

            const obj = await puppeteer.launch({ headless: true,dumpio: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
            this.browser = obj;
            return this;
        })();
    }

    getMetaData = async (url) => {

        try {

            let title = "";
            let siteName = "";
            let images= [];
            let favicons = [];

            const page = await this.browser.newPage();
            page.setUserAgent("facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)");
            await page.goto(url)
            await page.waitForSelector('meta');

            let data = await this.readTags(page); 
            await page.close();

            const preview = {
                title: data.title,
                description: data.description,
                image: data.imgUrl
            }

            return preview;
        }
        catch (err) {
            if (this.browser)
                await this.browser.close();
            throw err;
        }
    }

    readTags = async (page) => {
        
        const preview = await page.evaluate(() => {
            let preview = {};
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
        
        return preview;
    };    
}