const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dialogflow', (req, res) => {
    const dialogflowUrl = 'https://dialogflow.cloud.google.com/v1/integrations/messenger/webhook/882d92d7-b3d3-47a9-a973-b0b11c068ee5/sessions/dfMessenger-44936424';

    const options = {
        url: dialogflowUrl,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    };

    request.post(options, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(response.statusCode).send(body);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
