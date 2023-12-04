'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var AWS = require('aws-sdk');
var dynamoDb = new AWS.DynamoDB.DocumentClient();
var create = function (event, context, callback) {
    var timestamp = new Date().getTime();
    var _a = JSON.parse(event.body), id = _a.id, position = _a.position, name = _a.name, grade = _a.grade, price = _a.price, category = _a.category;
    if (typeof name !== 'string') {
        console.error('Validation Failed');
        callback(new Error('Couldn\'t create the todo item.'));
        return;
    }
    var TableName = process.env.DYNAMODB_TABLE;
    var params = {
        TableName: TableName ? TableName : 'PRODUCTS_TABLE',
        Item: {
            id: id,
            position: position,
            name: name,
            grade: grade,
            price: price,
            category: category
        }
    };
    dynamoDb.put(params, function (error, result) {
        if (error) {
            console.error(error);
            callback(new Error("Couldn't create the todo item. ".concat(error.message)));
            return;
        }
        var response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
    });
};
exports.create = create;
