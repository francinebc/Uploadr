const gc = require('../config/');
const bucket = gc.bucket('test20201018');

const uploadFile = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;

  const blob = bucket.file(originalname.replace(/ /g, '_'));
  const blobStream = blob.createWriteStream({
    resumable: false
  });
  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    resolve(publicUrl);
  })
    .on('error', () => {
      reject('Unable to upload doc, something went wrong');
    })
    .end(buffer);
});

module.exports = uploadFile;