const express = require('express');
const _ = require('lodash');
const uploadFile = require('../service/uploadService');
const multer = require('multer');

const router = express.Router();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
});

router.post('/upload', multerMid.single('upload-file'), function (req, res) {
  const {file} = req;

  if (_.isNil(file)) {
    res.status(400)
      .send('No file provided');
  }

  uploadFile(file)
    .then((url) => {
      res.send({url});
    })
    .catch(() => {
      res.status(500).send('Failed to upload file');
    });
});

module.exports = router;