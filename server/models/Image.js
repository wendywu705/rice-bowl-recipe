const mongoose = require('mongoose');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  imageName: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    required: true,
  },
});

const Image = mongoose.model('images', mongoSchema);

module.exports = Image;
