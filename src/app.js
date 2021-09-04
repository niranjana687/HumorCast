const path = require('path');

const express = require('express');

const app = express();

const port = 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//home page route using hbs
app.get('', (request, response) => {
    response.render('index', {
        title: 'Humor-It',
        name: 'Niranjana',
    });
});

//about page router
app.get('/about', (request, response) => {
    response.render('about', {
        title: 'Humor It',
        description: 'Weather app but with a funny twist!',
        name: 'Niranjana',
    });
});

//help route 
app.get('/help', (request, response) => {
    response.render('help', {
        message: 'Help page of Humor it',
    });
});

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

