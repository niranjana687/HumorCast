const request = require('request');

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=c7f6c4aac8ba5a9ea3af3998376349f2&query='+ longitude + ','+longitude+'&units=f';
    
    request({url, json:true}, (error, {body}) => {
        
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location, try another one!', undefined);
        } else {
            // console.log(body.current.temperature)
            callback(undefined, 'The weather is ' +body.current.weather_descriptions[0]+ ' and temperature is '+parseInt(body.current.temperature));
        }
    });
}

module.exports = forecast; 