const s3Service = require("./s3Service");
const dynamodbService = require("./dynamodbService");
const { buckets } = require("../infra/config");
const uuid = require("uuid/v4");

const uploadImage = async function(event) {
  const object = {
    Bucket: buckets.images,
    Key: uuid() + ".jpg",
    Body: new Buffer(event.body.replace(/^data:image\/\w+;base64,/, ""), "base64"),
    ContentEncoding: "base64",
    ContentType: "image/jpeg"
  };
  await s3Service.putObject(object);
  await dynamodbService.put({ id: object.Key, bucket: object.Bucket });
  return {
    statusCode: 201,
    body: JSON.stringify({ id: object.Key, bucket: object.Bucket })
  };
};

module.exports = {
  uploadImage
};
