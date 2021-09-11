
console.log('client side javascript is loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading..';
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then( (response) => {
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

});

// fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
// 	"method": "GET",
// 	"headers": {
// 		"accept": "application/json",
// 		"x-rapidapi-key": "SIGN-UP-FOR-KEY",
// 		"x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });