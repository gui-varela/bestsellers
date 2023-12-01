'use strict'

import { Context } from "aws-sdk/clients/autoscaling";
import { Event } from "aws-sdk/clients/s3";

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime()
  const { 
    id, 
    position, 
    name, 
    grade, 
    price, 
    category 
  } = JSON.parse(event.body)
  
  if (typeof name !== 'string') {
    console.error('Validation Failed')
    callback(new Error('Couldn\'t create the todo item.'))
    return
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id, 
      position, 
      name, 
      grade, 
      price, 
      category
    }
  }

  // write the todo to the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback(new Error(`Couldn\'t create the todo item. ${error.message}`))
      return
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}