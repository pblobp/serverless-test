const s3Service = require("../services/s3Service");
const jimp = require("jimp");
const { buckets } = require("../infra/config");

const convertToThumbnail = async function(event) {
  const s3info = JSON.parse(event.Records[0].Sns.Message);
  const bucket = s3info.Records[0].s3.bucket.name;
  const key = s3info.Records[0].s3.object.key;
  const objectS3 = await s3Service.getObject({
    Bucket: bucket,
    Key: key
  });
  const image = await jimp.read(objectS3.Body);
  const buffer = await image
    .resize(100, 100)
    .quality(80)
    .getBufferAsync(jimp.MIME_JPEG);
  await s3Service.putObject({
    Bucket: buckets.thumbnails,
    Key: "thumb-" + key,
    Body: buffer
  });
  return { key: "thumb-" + key, bucket: buckets.thumbnails };
};

module.exports = {
  convertToThumbnail
};
