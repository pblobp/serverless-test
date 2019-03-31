"use strict";
const imageService = require("./services/imageService");

module.exports.uploadImage = async event => {
  const response = await imageService.uploadImage(event);
  if (response) return { statusCode: 201, body: response };
};

module.exports.generateThumbnail = async event => {
  const response = await imageService.generateThumbnail(event);
  if (response) return { statusCode: 201, body: response };
};

module.exports.filterImage = async event => {
  const response = await imageService.filterImage(event);
  if (response) return { statusCode: 201, body: response };
};