const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const { vertices, edges, 'edge-details': edgeDetails, start } = req.body;

    const inputContent = `${vertices}\n${edges}\n${edgeDetails}\n${start}\n`;
    const inputFilePath = path.join(__dirname, 'input.txt');
    fs.writeFileSync(inputFilePath, inputContent);

    const execPath = path.join(__dirname, 'dijkstra.exe');
    exec(`"${execPath}" < "${inputFilePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error.message}`);
            return res.send(`<pre>Error: ${error.message}</pre>`);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.send(`<pre>Error: ${stderr}</pre>`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
