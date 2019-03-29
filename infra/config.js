const buckets = {
    images: process.env.BUCKET_IMAGES || "serverless-bucket-images",
    thumbnails: process.env.BUCKET_THUMBNAILS || "serverless-bucket-thumbnails"
};
const tables = {
    images: "images"
};

module.exports = {
    buckets,
    tables
};
