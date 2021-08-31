const path = require('path');

const express = require('express');

const app = express();

const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

//weather route
app.get('/weather', (request, response) => {
    response.send({
        forecast: 'pleasant warm weather',
        location: 'kochi',
    });
});


app.listen(port, () => {
    console.log(`We are listening at http://localhost:${port}`);
});

