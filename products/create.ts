'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const create = (event: any, context: any, callback: any) => {
  const { 
    id, 
    position, 
    name, 
    grade, 
    price, 
    category 
  } = JSON.parse(event.body);
  
  if (typeof name !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the todo item.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE!,
    Item: {
      id, 
      position, 
      name, 
      grade, 
      price, 
      category
    }
  };

  dynamoDb.put(params, (error: any, result: any) => {
    if (error) {
      console.error(error);
      callback(new Error(`Couldn\'t create the product item. ${error.message}`));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
    callback(null, response);
  });
};
