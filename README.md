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

Não foi possível criar uma maneira automatizada de popular o banco de dados. Por isso, é necessário rodar o web scraper, copiar cada produto do terminal e criar um por um (através de Postman/Insomnia ou pela documentação)
