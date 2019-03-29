const AWS = require("aws-sdk");
const uuid = require("uuid/v4");

const S3 = new AWS.S3();
const BUCKET = "launchlab-lambda";

const upload = async function(body) {
  const id = uuid() + ".jpg";
  await S3.putObject({
    Bucket: BUCKET,
    Key: id,
    Body: new Buffer(body.replace(/^data:image\/\w+;base64,/, ""), "base64"),
    ContentEncoding: "base64",
    ContentType: "image/jpeg"
  }).promise();
  console.log("data > ", body);
  return {
    bucket: BUCKET,
    key: id
  };
};

module.exports = {
  upload
};
