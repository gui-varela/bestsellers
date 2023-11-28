// Import puppeteer
import puppeteer from 'puppeteer'

export const allProducts = (async () => {

	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage();
	await page.goto('https://www.amazon.com.br/bestsellers')

	// Preferi deixar este reload porque a Amazon não permite fazer muitas requisições em sequência
	await page.reload()

	const categoryLinks = await page.$$eval('#zg_left_col2 a', element => element.map(link => {
		const linkInfos = {
			name: link.innerText,
			link: link.href
		}

		return linkInfos
	}))

	let sections = []

	for (const link of categoryLinks) {
		await page.goto(link.link)
		await page.reload()
		await page.waitForSelector('.p13n-desktop-grid')

		let i = 0
		let products = []

		const totalProductsInPage = await page.$$eval('#gridItemRoot', element => element)

		while (i < (totalProductsInPage.length >= 3 ? 3 : totalProductsInPage.length)) {
			const productName = await page.$eval(`#p13n-asin-index-${i} .p13n-sc-uncoverable-faceout span`, element => element.innerText)
			const productGrade = await page.$eval(`#p13n-asin-index-${i} .p13n-sc-uncoverable-faceout .a-row i.a-icon span`, element => element.innerText)
			const productPrice = await page.$eval(`#p13n-asin-index-${i} .p13n-sc-uncoverable-faceout .a-row .a-size-base span`, element => element.innerText)

			const product = {
				position: i + 1,
				name: productName,
				grade: productGrade,
				price: productPrice,
				category: link.name
			}

			products.push(product)

			i++
		}

		const section = {
			name: link.name,
			products,
		}

		sections.push(section)
		console.log(section)
	};

	await browser.close()

	return sections
})();