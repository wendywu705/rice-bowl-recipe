const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');

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
  app.post('/api/imageupload', multer.single('file'), (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }
    console.log('request header!?!?!? for image', req.headers.origin);
    console.log('img upload', req.body.data);
    console.log('the FILE', req.file);
    const imageDetail = JSON.parse(req.body.data);
    const newFileName = imageDetail.imageName;

    // Upload the image file to the Google Cloud Storage bucket
    const blob = bucket.file(newFileName);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      console.log('ERROR TO BLOBSTREAM:', err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`;
      const imageDetails = JSON.parse(req.body.data);
      imageDetails.image = publicUrl;
      res.status(200).send(publicUrl);
    });
    blobStream.end(req.file.buffer);
    res.status(200).json({ 'test?': 'done image uploaded!' });
  });
};
