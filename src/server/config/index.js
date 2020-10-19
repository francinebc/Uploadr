const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, './keys/tmp-until-20201030-sa.json');

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'uploadr-292902',
});

module.exports = storage;