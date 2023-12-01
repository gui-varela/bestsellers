'use strict';

import { Context } from "aws-sdk/clients/autoscaling";
import { Event } from "aws-sdk/clients/s3";

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event: { body: string; }, context: any, callback: CallableFunction) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.name !== 'string') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'wrong type.',
        });
        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: data.id,
            name: data.name,
            checked: false,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    // write the todo to the database
    dynamoDb.put(params, (error: { statusCode: any; message: any; }) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: `Couldn't create the todo item. ${error.message}`,
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
};