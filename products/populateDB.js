const { getAllProducts } = require('../puppeteer');
const { create } = require('./create');

module.exports.populateDB = async () => {
    try {
        const allProducts = await getAllProducts();

        if (!allProducts || allProducts.length === 0) {
            console.error("Nenhum produto encontrado.");
            return; 
        }

        for (const product of allProducts) {
            const event = {
                body: JSON.stringify(product)
            };

            await new Promise((resolve, reject) => {
                create(event, (error, result) => {
                    if (error) {
                        console.error(`Erro ao criar produto: ${error.message}`);
                        reject(error);
                    } else {
                        console.log(`Produto criado com sucesso: ${JSON.stringify(result.body)}`);
                        resolve(result);
                    }
                });
            });
        }
    } catch (error) {
        throw new Error("Não foi possível popular o banco de dados.");
    }
};
