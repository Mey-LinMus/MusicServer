const express = require("express");
const axios = require("axios");
const qs = require("qs");
const cors = require("cors"); // Import the cors package
require("dotenv").config();

const app = express();
const port = 8888;

const requestLogger = (req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next(); // Call the next middleware in the chain
};

app.use(cors()); // Enable CORS for all routes
app.use(requestLogger);

app.get("/token", async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  try {
    const tokenResponse = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      data: qs.stringify({
        grant_type: "client_credentials",
      }),
    });

    res.json(tokenResponse.data);
  } catch (error) {
    console.error("Error fetching token from Spotify:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
