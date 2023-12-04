'use strict';

const AWS = require('aws-sdk'); 

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const listItems = async (event: any, context: any, callback: any) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE!,
    };

    await dynamoDb.scan(params, (error: Error, result: any) => {
        if (error) {
            console.error(error);
            callback(new Error(`Couldn\'t get items. ${error.message}`));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
        callback(null, response);
    });
};