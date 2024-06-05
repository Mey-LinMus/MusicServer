require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

let accessToken = "";

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    console.log("The access token expires in " + data.body["expires_in"]);
    console.log("The access token is " + data.body["access_token"]);

    accessToken = data.body["access_token"];

    setInterval(() => {
      spotifyApi.clientCredentialsGrant().then(
        function (data) {
          accessToken = data.body["access_token"];
          console.log("The access token has been refreshed");
        },
        function (err) {
          console.log("Could not refresh the access token", err);
        }
      );
    }, (data.body["expires_in"] - 60) * 1000);
  },
  function (err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

app.get("/api/albums/:id", (req, res) => {
  const albumId = req.params.id;

  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .getAlbum(albumId)
    .then((data) => {
      res.json(data.body);
    })
    .catch((err) => {
      console.error("Error getting album:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/api/playlists/:id/tracks", (req, res) => {
  const playlistId = req.params.id;

  spotifyApi.setAccessToken(accessToken);
  spotifyApi
    .getPlaylistTracks(playlistId)
    .then((data) => {
      const tracks = data.body.items.map((item) => {
        const track = item.track;
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album.images[0]
        );
        return {
          artist: track.artists[0].name,
          title:
            track.name.length > 25
              ? track.name.substring(0, 25) + "..."
              : track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
          duration_ms: track.duration_ms,
        };
      });
      res.json(tracks);
    })
    .catch((err) => {
      console.error("Error fetching playlist tracks:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
