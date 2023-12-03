const { getAllProducts } = require('../puppeteer');
const { create } = require('./create');

module.exports.populateDB = async () => {
    try {
        const allProducts = await getAllProducts()

        if (!allProducts || allProducts.length === 0) {
            throw new Error("Nenhum produto encontrado.")
        }

        for (const product of allProducts) {
            const event = {
                body: JSON.stringify(product)
            };

            await new Promise((resolve, reject) => {
                create(event, (error, result) => {
                    if (error) {
                        reject(error);
                        throw new Error(`Erro ao criar produto: ${error.message}`)
                    } else {
                        console.log(`Produto criado com sucesso: ${JSON.stringify(result.body)}`)
                        resolve(result);
                    }
                });
            });
        }
    } catch (error) {
        throw new Error(`Não foi possível popular o banco de dados. ${error}`);
    }
};
