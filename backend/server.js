const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());

app.get('/getAccessToken', (req, res) => {
    exec('gcloud auth print-access-token', (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Error executing gcloud command: ${error.message}`);
            return;
        }
        if (stderr) {
            res.status(500).send(`Error executing gcloud command: ${stderr}`);
            return;
        }
        res.send(stdout.trim()); // Send the access token as plain text
    });
});

const PORT = process.env.PORT || 3001; // You can choose any available port
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});