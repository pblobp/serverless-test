"use strict";
const uploadService = require("./services/uploadService");
const thumbnailService = require("./services/thumbnailService");

module.exports.uploadImage = async event => {
  return uploadService.uploadImage(event);
};

module.exports.generateThumbnail = async event => {
  return thumbnailService.convertToThumbnail(event);
};
