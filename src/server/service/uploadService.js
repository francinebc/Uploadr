const storage = require('../config/');
const {format} = require('util');
const bucket = storage.bucket('test20201018');

const uploadFile = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;

  const blob = bucket.file(originalname); //.replace(/ /g, '_'));
  const blobStream = blob.createWriteStream(); //{resumable: false});

  console.log(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

  blobStream
    .on('finish', () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      resolve(publicUrl);
    })
    .on('error', (err) => {
      reject('Unable to upload doc, something went wrong: ' + err);
    })
    .end(buffer);
});

module.exports = uploadFile;