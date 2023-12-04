'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const getItem = async (event: any, context: any, callback: any) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE!,
        Key: {
            id: event.pathParameters?.id,
        },
    };

    await dynamoDb.get(params, (error: any, result: any) => {
        if (error) {
            console.error(error);
            callback(new Error(`Couldn\'t get the product item. ${error.message}`));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
        callback(null, response);
    });
};