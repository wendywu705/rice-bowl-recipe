const Multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');
const imageModel = require('../models/Image');

require('dotenv').config();

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY,
  },
});

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 megabytes
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

module.exports = (app) => {
  // Display error when log in fails
  app.post('/api/imageupload', multer.single('file'), (req, res) => {
    const imageDetail = JSON.parse(req.body.data);
    console.log('imageName:', imageDetail.imageName);
    const newFileName = imageDetail.imageName;
    console.log('newFileName: ', newFileName);
    const blob = bucket.file(newFileName);
    const blobStream = blob.createWriteStream();

    console.log(newFileName);
    blobStream.on('error', (err) => {
      console.log(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`;
      const imageDetails = JSON.parse(req.body.data);

      imageDetails.image = publicUrl;
    });

    blobStream.end(req.file.buffer);
  });
};
