const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

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
        title: 'Humor It',
        name: 'Niranjana'
    });
});

//weather route
app.get('/weather', (request, response) => {
    if (!request.query.address) {
        return response.send({
            error: 'Please provide an address!',
        });
    }
    // geocode(request.query.address, forecast(geocode.latitude, geocode.longitude));
    
    geocode(request.query.address, (error, {latitude, longitude, location} = {} ) => {
        
        if (error) {
            return response.send(
                {error: error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            
            if (error) {
                return response.send(
                    {error: error});
            }
            response.send({
                location: location,
                description: forecastData,
            });
        });
    });
});

//query string tryout
app.get('/products', (request, response) => {
    if (!request.query.search) {
        return response.send({
            error: 'Please provide a search parameter!',
        });
    }
    console.log(request.query);
    response.send({
        products: [],
    });
})

//missing help article
app.get('help/*', (request, response) => {
    response.render('404', {
        error: '404: Page not found',
    });
});

//error page router
app.get('*', (request, response) => {
    response.render('404', {
        error: '404: Page not found',
    });
});

app.listen(port, () => {
    console.log(`We are listening at http://localhost:${port}`);
});

