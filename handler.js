"use strict";

const s3Service = require("./services/s3Service");

module.exports.upload = async event => {
  const result = await s3Service.upload(event.body);
  return {
    statusCode: 201,
    body: JSON.stringify(result)
  };
};
