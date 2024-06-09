# WorkZen Music Server

Deze repository bevat de backend server voor het integreren van muziek in de WorkZen webapplicatie. De server is gebouwd met Node.js en Express en maakt verbinding met de Spotify API voor het streamen van muziek.

## Inhoudstafel

- [WorkZen Music Server](#workzen-music-server)
  - [Inhoudstafel](#inhoudstafel)
  - [Getting Started](#getting-started)
  - [Features](#features)
  - [Usage](#usage)
    - [Gebruiker login](#gebruiker-login)
    - [Refresh Token](#refresh-token)
  - [Scripts en Dependencies](#scripts-en-dependencies)
    - [Scripts](#scripts)
  - [File Structure](#file-structure)
  - [Development](#development)
    - [De ontwikkelomgeving instellen](#de-ontwikkelomgeving-instellen)
  - [Gebruikte Scripts](#gebruikte-scripts)
  - [Bronnen die geholpen hebben voor het project](#bronnen-die-geholpen-hebben-voor-het-project)

## Getting Started

Volg deze stappen om aan de slag te gaan met de WorkZen Backend Favorites server:

    1. Clone de repository:

```bash
   git clone https://github.com/Mey-LinMus/MusicServer.git
   cd MusicServer
```

    2. Installeer dependencies:

```bash
    npm install
```

    3. Maak in de hoofddirectory een .env-bestand aan met de volgende inhoud:

```bash
PORT=8888
REDIRECT_URI=your_redirect_uri
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret

```

    4. Start de server:

```bash
npm run start
```

De applicatie is beschikbaar op ´http://localhost:8888´.

## Features

- Spotify integratie: Maak verbinding met Spotify om muziekstreaming mogelijk te maken.
- Token verversen: Spotify toegangstokens verversen.
- Gebruikersauthenticatie: Gebruikersaanmelding via Spotify afhandelen.

## Usage

### Gebruiker login

Om een gebruiker aan te melden, stuur je een POST-verzoek naar /login met de volgende JSON body:

```json
{
  "code": "authorization_code"
}
```

### Refresh Token

Om een toegangstoken te vernieuwen, stuurt u een POST-verzoek naar /refresh met de volgende JSON body:

```json
{
  "refreshToken": "your_refresh_token"
}
```

## Scripts en Dependencies

- Express: Een minimaal en flexibel Node.js webapplicatie framework.
- Spotify Web API Node: Een bibliotheek voor integratie met de Spotify Web API.
- Cors: Middleware voor het inschakelen van CORS (Cross-Origin Resource Sharing).
- Dotenv: Module om omgevingsvariabelen te laden vanuit een .env bestand.
- Body-parser: Middleware om inkomende request bodies te parsen.
- Nodemon: Tool om de server automatisch te herstarten tijdens ontwikkeling.

### Scripts

- Start: npm start - Runt de server gebruik makende van Node.js.
- Development: nodemon server.js - Runt de server gebruik makende van Nodemon voor automatische restarts tijdens de ontwikkeling.

## File Structure

- package.json - Project metadata and dependencies.
- server.js - Hoofdserverbestand dat de Express-server en routes instelt.

## Development

### De ontwikkelomgeving instellen

1. Installeer Node.js and npm.
2. Clone de repository en ga naar de project map.
3. Installeer de nodige dependencies door gebruik te maken van ´npm install´.
4. Maak een .env-bestand aan met de vereiste omgevingsvariabelen.
5. Start the development server using npm run start.

## Gebruikte Scripts

**Nodemon**
Use the package manager [npm](https://www.npmjs.com/package/nodemon) to install nodemon.

```bash
npm i nodemon
```

**Express**
Use the package manager [npm](https://www.npmjs.com/package/express) to install express.

```bash
npm i express
```

**Cors**
Use the package manager [npm](https://www.npmjs.com/package/cors) to install cors.

```bash
npm i cors
```

**Body Parser**
Use the package manager [npm](https://www.npmjs.com/package/body-parser) to install body-parser.

```bash
npm i body-parser
```

**Body Parser**
Use the package manager [npm](https://www.npmjs.com/package/spotify-web-api-node) to install spotify-web-api-node.

```bash
npm i spotify-web-api-node
```

## Bronnen die geholpen hebben voor het project

- Spotify API: https://developer.spotify.com/documentation/web-api


