const mongoose = require("mongoose");

const newSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    artist_name: {
      type: String,
      required: true,
    },
    album_name: {
      type: String,
      required: true,
    },
    art_work: {
      type: String,
      required: true,
    },
    audio_music: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const newModel = new mongoose.model("song", newSchema);

module.exports = newModel;
