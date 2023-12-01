import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import express from "express";
import serverless from "serverless-http";

const app = express();

const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

interface Product {
  productId: string
  position: number
  name: string
  grade: number
  price: number | "Indisponível"
  category: string
}

const NUMBER = "number"
const STRING = "string"

app.get("/products/:productId", async function (req, res) {
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: {
      productId: req.params.productId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.send(new GetCommand(params));
    if (Item) {
      const { productId, position, name, grade, price, category } = Item;
      res.json({ productId, position, name, grade, price, category });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find produc with provided "producId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive produc" });
  }
});

app.post("/products", async function (req, res) {
  const { productId, position, name, grade, price, category }: Product = req.body;

  if (typeof productId !== STRING) {
    res.status(400).json({ error: '"productId" must be a string' });
  } else if (typeof position !== NUMBER) {
    res.status(400).json({ error: '"position" must be a number' });
  } else if (typeof name !== STRING) {
    res.status(400).json({ error: '"name" must be a string' });
  } else if (typeof grade !== NUMBER) {
    res.status(400).json({ error: '"grade" must be a number' });
  } else if (typeof price !== NUMBER) {
    res.status(400).json({ error: '"price" must be a number' });
  } else if (typeof category !== STRING) {
    res.status(400).json({ error: '"category" must be a string' });
  }

  const Item: Product = {
    productId,
    name,
    position,
    grade,
    price,
    category
  }

  const params = {
    TableName: PRODUCTS_TABLE,
    Item
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    res.json({ productId, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create product" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
