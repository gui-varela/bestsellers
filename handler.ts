import { getProductSraper, ProductList } from './puppeteer/index'

export const updateDBTable = async (): Promise<ProductList[]> => {
    return await getProductSraper()
}

