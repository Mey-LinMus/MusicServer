const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8888;

app.use(cors({ origin: "https://workzen-webapp.onrender.com" }));
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      app.post("/refresh", (req, res) => {});
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});

app.post("/login", async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  } catch (err) {
    console.error("Error during authorizationCodeGrant:", err);
    res.status(400).json({ error: "Failed to retrieve access token" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World, how are you!!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
