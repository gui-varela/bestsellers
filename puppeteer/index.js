import puppeteer from 'puppeteer'
import v4 from "uuid"

export const allProducts = (async () => {

    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] })
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

        let counter = 0
        let products = []

        const totalProductsInPage = await page.$$eval('#gridItemRoot', element => element)

        while (counter < (totalProductsInPage.length >= 3 ? 3 : totalProductsInPage.length)) {
            const productName = await page.$eval(`#p13n-asin-index-${counter} .p13n-sc-uncoverable-faceout span`, element => element.innerText)
            const productGrade = Number.parseFloat(await page.$eval(
                `#p13n-asin-index-${counter} .p13n-sc-uncoverable-faceout .a-row i.a-icon span`,
                element => element.innerText
            ))

            const productPrice = await page.evaluate((counter) => {
                const price = document.querySelector(`#p13n-asin-index-${counter} .p13n-sc-uncoverable-faceout .a-row .a-size-base span`)
                if (!price) {
                    return "Indisponível"
                }
                return price.innerText
            }, counter)

            const product = {
                id: v4(),
                position: counter + 1,
                name: productName,
                grade: productGrade,
                price: productPrice,
                category: link.name
            }

            products.push(product)
            counter++
        }

        const section = {
            name: link.name,
            products,
        }

        sections.push(section)
        console.log(section)
        console.log(",")
    };

    await browser.close()

    return JSON.stringify(sections)
})();