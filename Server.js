const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8888;

app.use(cors({ origin: "https://workzen-webapp.onrender.com" }));
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the Spotify API credentials
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Endpoint to handle refresh token
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  spotifyApi.setRefreshToken(refreshToken);

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.error("Error refreshing access token:", err);
      res.sendStatus(400);
    });
});

// Endpoint to handle login and exchange code for tokens
app.post("/login", async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

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

// Endpoint to handle callback after user authorization
app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        const accessToken = data.body.access_token;
        const refreshToken = data.body.refresh_token;
        const expiresIn = data.body.expires_in;

        // Redirect with tokens in query parameters (or handle as needed)
        res.redirect(
          `/?access_token=${accessToken}&refresh_token=${refreshToken}&expires_in=${expiresIn}`
        );
      })
      .catch((err) => {
        console.error("Error during authorizationCodeGrant:", err);
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Hello World, how are you!!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
