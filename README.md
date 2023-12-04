Este template foi retirado do repositório de templates do Serverless Framework:

- [serverless/examples repository](https://github.com/serverless/examples/)
- Serverless Framework Node HTTP API on AWS

## Uso

### Instalar dependências

```bash
npm i
```

### Deploy

```bash
serverless deploy
```

### Documentação

Para acessar a documentação, rode o seguinte comando:

```bash
ts-node swagger.ts
```

Em seguida, basta abrir http://localhost:3000/api-docs para abrir no navegador

### Web Scraper

⚠️ Adicione a linha abaixo no package.json antes de rodar o web scraper:

```json
"type": "module",
```

Rode o seguinte comando para rodar o web scraper

```bash
ts-node puppeteer/index.js
```

Os produtos aparecerão no terminal prontos para serem usados.

### Populando o banco

Não foi possível criar uma maneira automatizada de popular o banco de dados. Por isso, é necessário rodar o web scraper, copiar cada produto retornado no console e criar um por um (através de Postman/Insomnia ou pela página da documentação)

### Não uso do TypeScript

Por algum motivo, ao aplicar o TypeScript compilar as funções, apenas a função create funcionava. As demais funções geravam um erro que não trazia informações úteis.

Na branch **refatorarCodigoParaTypescript** eu tentei fazer esse refactor de JS para TS, mas sem sucesso. Então deixei na **main** os códigos em JS que funcionavam. Desde o início tive problemas para usar o TypeScript no projeto, fiquei alguns dias resolvendo erros desse tipo.

