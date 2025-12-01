const newsApiURL = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4c2e938b6b194885a76882996b92f3b2';
const newsTechURl = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=4c2e938b6b194885a76882996b92f3b2';
const jokeAPIUrl = 'https://v2.jokeapi.dev/joke/Any?type=single';
const weather = 'http://api.weatherapi.com/v1/current.json?key=590277d22f1844e28c9232133252811&q=auto:ip';
const weatherForecast = 'http://api.weatherapi.com/v1/forecast.json?key=590277d22f1844e28c9232133252811&q=auto:ip';

/*
When fetching weather api from weather Api, 
Base URL : http://api.weatherapi.com/v1
API Method: After the base URL, you append a specific method depending on the type of data you want. For example:
/current.json → Current weather data
/forecast.json → Forecast data (up to 14 days)
/history.json → Historical weather data
/alerts.json → Weather alerts
/marine.json → Marine and tide forecasts

AFTER YOUR KEY, USE THE q parameter to specify which location 
q → The query parameter (location input). It can be:

City name (e.g., q=London)
Latitude/Longitude (e.g., q=48.8567,2.3508)
Zip/postcode (e.g., q=10001)
IP address (e.g., q=auto:ip)

example : http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London

*/





async function fetchWeather(){
    try{
        const response = await fetch(weather);
        const data = await response.json();
       console.log(data);
    }catch(error){
        console.log(error);
    }
}

async function fetchWeatherForecast(){
    try{
        const response = await fetch(weatherForecast);
        const data = await response.json();
       console.log(data);
    }catch(error){
        console.log(error);
    }
}



async function fetchNews(){
    try{
        const response = await fetch(newsApiURL);
        const data = await response.json();
       console.log(data);
    }catch(error){
        console.log(error);
    }
}

async function fetchNewsTech(){
    try{
        const response = await fetch(newsTechURl);
        const data = await response.json();
       console.log(data);
    }catch(error){
        console.log(error);
    }
}


async function fetchJokes(){
    try{
        const response = await fetch(jokeAPIUrl);
        const data = await response.json();
       console.log(data);
    }catch(error){
        console.log(error);
    }
}



// fetchNews();  // this is reaching the console. fetch OK
// fetchNewsTech();
// fetchJokes();
 //fetchWeather(); 
// fetchWeatherForecast();