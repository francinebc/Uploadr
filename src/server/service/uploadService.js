const storage = require('../config/');
const {format} = require('util');
const bucket = storage.bucket('tmp-until-20201030');

const uploadFile = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;

  const blob = bucket.file(originalname);
  const blobStream = blob.createWriteStream();

  blobStream
    .on('finish', () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      resolve(publicUrl);
    })
    .on('error', (err) => {
      console.error(err); // could return error to user here, but I don't think it's good to expose client
      reject('Unable to upload doc, something went wrong.');
    })
    .end(buffer);
});

module.exports = uploadFile;