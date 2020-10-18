const express = require('express');
const _ = require('lodash');
const uploadFile = require('../service/uploadService');
const multer = require('multer');

const router = express.Router();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  dest: 'tmp/uploads'
});

router.post('/upload', multerMid.single('upload-file'), function (req, res) {
  console.log(req.file);
  console.log('something posted');


  const {file} = req;

  if (_.isNil(file)) {
    res.status(400)
      .send({'error': 'no file provided'});
  }

  uploadFile(file)
    .then(() => {
      console.log('success');
      res.send({'success': 'file uploades'});
    })
    .catch(console.error);

});

module.exports = router;