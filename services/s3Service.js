const AWS = require("aws-sdk");
const S3 = new AWS.S3();

const putObject = async function(object) {
  return S3.putObject(object).promise();
};

const getObject = async function(object) {
  return S3.getObject(object).promise();
};

module.exports = {
  putObject,
  getObject
};
