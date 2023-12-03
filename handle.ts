import { getProductSraper, ProductList } from './puppeteer/index.ts'

const allProducts: Promise<ProductList[]> = getProductSraper()

console.log(allProducts)