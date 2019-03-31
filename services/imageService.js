const jimp = require("jimp");
const uuid = require("uuid/v4");
const s3Service = require("./s3Service");
const dynamodbService = require("./dynamodbService");
const { buckets } = require("../infra/config");

const uploadImage = async function(event) {
  const object = { Bucket: buckets.images, Key: uuid() + ".jpg", Body: new Buffer(event.body.replace(/^data:image\/\w+;base64,/, ""), "base64"), ContentEncoding: "base64", ContentType: "image/jpeg" };
  await s3Service.putObject(object);
  await dynamodbService.put({ id: object.Key, bucket: object.Bucket });
  return { statusCode: 201, body: JSON.stringify({ id: object.Key, bucket: object.Bucket }) };
};

const generateThumbnail = async function(event) {
  const s3info = JSON.parse(event.Records[0].Sns.Message);
  const bucket = s3info.Records[0].s3.bucket.name;
  const key = s3info.Records[0].s3.object.key;
  const objectS3 = await s3Service.getObject({ Bucket: bucket, Key: key });
  const image = await jimp.read(objectS3.Body);
  const buffer = await image
    .resize(100, 100)
    .quality(80)
    .getBufferAsync(jimp.MIME_JPEG);
  await s3Service.putObject({ Bucket: buckets.thumbnails, Key: "thumb-" + key, Body: buffer });
  return { key: "thumb-" + key, bucket: buckets.thumbnails };
};

const filterImage = async function(event) {
  const s3info = JSON.parse(event.Records[0].Sns.Message);
  const bucket = s3info.Records[0].s3.bucket.name;
  const key = s3info.Records[0].s3.object.key;
  const objectS3 = await s3Service.getObject({ Bucket: bucket, Key: key });
  const image = await jimp.read(objectS3.Body);
  const buffer = await image
    .grayscale()
    .quality(80)
    .getBufferAsync(jimp.MIME_JPEG);
  console.log("putObject > ", "bw-" + key, buckets.filteredImages);
  await s3Service.putObject({ Bucket: buckets.filteredImages, Key: "bw-" + key, Body: buffer });
  return { key: "bw-" + key, bucket: buckets.filteredImages };
};

module.exports = {
  uploadImage,
  generateThumbnail,
  filterImage
};
