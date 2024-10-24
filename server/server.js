const express = require('express')
const cors = require('cors')
const platformClient = require('purecloud-platform-client-v2');
const { URLSearchParams } = require('url');
const path = require('path');

const CLIENT_ID = 'c00eed13-9bbd-475e-8527-87f99693beec';
const CLIENT_SECRET = 'c0kaEYSkwsaiz-cVc6-rY-KFRhu3tMz8lSZO9Halo1c';


const app = express()
let accessToken = null;

app.use(express.json());
app.use(cors());


app.get("/api", async (req, res) => {

    try {
        const client = platformClient.ApiClient.instance;
        client.setEnvironment(platformClient.PureCloudRegionHosts.eu_central_1);

        // Connexion en utilisant le flux d'octroi de client
        await client.loginClientCredentialsGrant(CLIENT_ID, CLIENT_SECRET);
        // Obtenir le jeton d'accès
        const tokenInfo = client.authData.accessToken;
        const tokenExpiry = client.authData.tokenExpiryTime;

        // Convertir le timestamp en une date lisible
        const expiryDate = new Date(tokenExpiry).toISOString();
        // Réponse avec le jeton d'accès
        res.json({ access_token: tokenInfo, token_expiry: expiryDate });

    } catch (error) {
        console.error('Erreur lors de l\'obtention du token :', error);
        res.status(500).json({ error: 'Erreur lors de l\'obtention du token' });
    }

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
//app.listen(5000, () => {console.log("Server started on port 5000")  })

module.exports = app;