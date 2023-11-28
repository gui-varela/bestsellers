// Import puppeteer
import puppeteer from 'puppeteer';

(async () => {
	// Launch the browser
	const browser = await puppeteer.launch({ headless: false });

	// Create a page
	const page = await browser.newPage();

	// Go to your site
	await page.goto('https://www.amazon.com.br/bestsellers');

	await page.reload()

	// Query for an element handle.
	const element = await page.waitForSelector('.celwidget');

	const titles = element 
		? await page.$$eval('.a-carousel-heading', element => element.map(title => title.innerText)) 
		: "Sem título"

	// Do something with element...
	console.log(titles)

	await element.dispose();


	// Close browser.
	await browser.close();
})();