"use strict";
const uploadService = require("./services/uploadService");
const thumbnailService = require("./services/thumbnailService");

module.exports.uploadImage = async event => {
  const response = await uploadService.uploadImage(event);
  if (response) return { statusCode: 201, body: response };
};

module.exports.generateThumbnail = async event => {
  const response = await thumbnailService.convertToThumbnail(event);
  if (response) return { statusCode: 201, body: response };
};
