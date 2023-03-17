const express = require("express");
const route = express.Router();
const newModel = require("../model/model");

// route.get("/", (req, res) => {
//   try {
//     this.post
//       .find({})
//       .then((data) => {
//         res.json(date);
//       })
//       .catch((error) => {
//         res.status(408).json({ error });
//       });
//   } catch (error) {
//     res.json({ error });
//   }
// });

route.post("/create-music", async (req, res) => {
  const { genre, title, artist_name, album_name, art_work, audio_music } =
    req.body;

  try {
    const data = await newModel.create({
      genre,
      title,
      artist_name,
      album_name,
      art_work,
      audio_music,
    });
    data.save();
    res.send(data);
    
  } catch (error) {
    res.send({ status: error });
  }
});

route.get("/song-list", async (req, res) => {
  newModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

route.get("/album-list", async (req, res) => {
  const agg = await newModel.aggregate([
    {
      $group: {
        _id: {
          artist: "$artist_name",
          album: "$album_name",
          artwork: "$art_work",
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: null,
        person: "$_id",
      },
    },
  ]);
  // const artist = agg[0].person.artist;
  // const album = agg[0].person.album;
  // const artwork = agg[0].person.artwork;
  res.status(200).send({
    data: agg,
  });
});
route.post("/update", async (req, res) => {
  const { id, genre, title, artist_name, album_name, art_work, audio_music } =
    req.body;
  try {
    const data = await newModel.updateMany(
      { _id: id },
      {
        $set: {
          genre,
          title,
          artist_name,
          album_name,
          art_work,
          audio_music,
        },
      }
    );
    data.save();
    res.send(data);
  } catch (error) {
    res.send({ status: error });
  }
});

route.post("/song-delete", async (req, res) => {
  const { id } = req.body;
  await newModel.deleteOne({ _id: id });
});

module.exports = route;
