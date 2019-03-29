const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { tables } = require("../infra/config");

const put = async function(item) {
  return dynamodb.put({ TableName: tables.images, Item: item }).promise();
};

module.exports = {
  put
};
