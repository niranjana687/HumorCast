
console.log('client side javascript is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const jokeHeader = document.querySelector('h4');
const joke = document.querySelector('#joke');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading..';
    fetch('/weather?address='+encodeURIComponent(location)).then( (response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
            messageOne.textContent = data.error;
        } else {
            console.log(data.location);
            console.log(data.description);
            
            messageOne.textContent = data.location;
            messageTwo.textContent = data.description;
        }
    })
});

fetch("https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "jokes-by-api-ninjas.p.rapidapi.com",
		"x-rapidapi-key": "d84d3570cbmsh4cf2e7f5a3d5ce8p1e433ejsnde64c49690bc"
	}
})
.then(response => {
    response.json().then((data) => {
        if (data.error) {
            joke.textContent = 'Uhoh, this is not funny';
        } else {
            console.log(data[[0]]);
            jokeHeader.textContent = 'The funny part...';
            joke.textContent = data[[0]].joke;
        }
    })
	
})

});


