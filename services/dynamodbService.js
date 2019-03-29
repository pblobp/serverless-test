const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE = "images";

const put = async function(item) {
  return dynamodb.put({
      TableName: TABLE,
      Item: {
        id: item.key,
        bucket: item.bucket
      }
    }).promise();
};

module.exports = {
  put
};
