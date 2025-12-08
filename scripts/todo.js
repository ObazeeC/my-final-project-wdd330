
//const newsTechURl = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=4c2e938b6b194885a76882996b92f3b2';
const quotesAPIUrl = 'https://api.quotable.io/random';
const jokeAPIUrl = 'https://v2.jokeapi.dev/joke/Any?type=single';
const weather = 'https://api.weatherapi.com/v1/current.json?key=590277d22f1844e28c9232133252811&q=auto:ip';
const jokeText = document.getElementById('joke');
const news2 = ' https://newsdata.io/api/1/latest?apikey=pub_f7241adf337247e99f01e871265b6c38&q=sport&country=gb';


const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const jokeBtn = document.getElementById('get-joke-btn');
const clearAllBtn = document.getElementById('clearAll-task-btn');

const newsList = document.getElementById('news-list');
const quote = document.getElementById("quote");
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





// DOM elements































//****************WARNING !!!!! **********************************
//  TO DO Application section,  DO NOT TOUCH ANYTHIND


// Load tasks from localStorage when the page loads
let tasks = [];
function loadTasks(){
    const saved = localStorage.getItem('tasks');
    if(saved){
        tasks = JSON.parse(saved);
    }
}


// save tasks to localStorage
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks(){
    taskList.innerHTML = '';
    tasks.forEach((task, index) =>{
        const li = document.createElement('li');
        li.classList.add(task.completed ? 'completed' : 'Incomplete');
        
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleTaskStatus(${index})">
            ${task.completed ? 'Undone' : 'Done'}
            </button>
            
            <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
            `;
            taskList.appendChild(li)
            
    });
    

    // save everytime tasks are rendered
    saveTasks();
}





function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({
            text: taskText,
            completed: false
        });
        taskInput.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);


//load task before rendering for the first time
loadTasks();
renderTasks();


//clear all task method
// Clear all tasks

function clearAllTasks() {
    if (confirm("Are you sure you want to delete all tasks for the day?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}

// Add button listener
clearAllBtn.addEventListener('click', clearAllTasks);


// ******NEWS API TEST***** THE API DOES NOT DISPLAY ON NETLIFY
/*
let articles = [];       // from API
let currentIndex = 0;    // which article is shown

function displayArticle(index) {
    const viewer = document.getElementById("newsViewer");

//Handle wrap-around if index is beyound array length
if(index >= articles.length){
    index = 0;
}
const article = articles[index];

//skip if no image
if(!article.urlToImage){
    //Move to next article
    currentIndex = (index + 1) % articles.length;
    displayArticle(currentIndex);
    return;
}
    //fade out before switching
    viewer.classList.add("fade-out");

    setTimeout(() =>{

const article = articles[index];
    
    // Handle missing image
    const imageUrl = article.urlToImage ? article.urlToImage : "placeholder.jpg";

    document.getElementById("newsTitle").textContent = article.title;
    document.getElementById("newsImage").src = imageUrl;
    document.getElementById("newsDesc").textContent = article.description || "No description available.";

    const sourceName = article.source?.name || "Unknown Source";
    const location = article.author || "Unknown Author/Location";

    document.getElementById("newsSource").textContent =
        `Source: ${sourceName} | Location: ${location}`;
        const linkEl = document.getElementById("newsLink");
        linkEl.href = article.url;
        linkEl.textContent = "Read Full Article";

         viewer.classList.remove("fade-out");
        
    },600);
    
}

fetch(newsApiURL)
    .then(res => res.json())
    .then(data => {
        articles = data.articles;   // save the list
        displayArticle(currentIndex); // show first one

          setInterval(() => {
            currentIndex = (currentIndex + 1) % articles.length;
            displayArticle(currentIndex);
        }, 25000);
    })
    .catch(err => console.error(err));

*/

/// ****WEATHER ***

    async function loadWeather() {
  try {
    const response = await fetch( weather
    );

    const data = await response.json();
    //console.log(data);

    // Extract needed values
    const iconUrl = "https:" + data.current.condition.icon;
    //const temp = data.current.temp_c;
    const temp = `${data.current.temp_c}°c`;
   const description = data.current.condition.text;
    const locationName = ` ${data.location.region},${data.location.country}`;

    // Update webpage
    document.getElementById("weather-icon").src = iconUrl;
    document.getElementById("weather-desc").textContent = description;
    document.getElementById("weather-location").textContent = locationName;
    document.getElementById("temp").textContent = temp;

  } catch (error) {
    console.error("Weather error:", error);
  }
}


// JOKES
async function fetchJokes(){
    try{
        const response = await fetch(jokeAPIUrl);
        const data = await response.json();
       //console.log(data);
       jokeText.textContent = data.joke;
    }catch(error){
        console.log(error);
    }
}

jokeBtn.addEventListener('click', fetchJokes);



//***********NEWS**************************
const newsTitleEl = document.getElementById("newsTitle");
const newsImageEl = document.getElementById("newsImage");
const newsLinkEl  = document.getElementById("newsLink");

let newsArticles = [];
let currentNewsIndex = 0;

// Fetch & filter articles
async function loadNews() {
    try {
        const res = await fetch(news2);
        const data = await res.json();

        // Keep only articles that have an image
        newsArticles = data.results.filter(a => a.image_url);

        if (newsArticles.length === 0) {
            newsTitleEl.textContent = "No news articles with images found.";
            return;
        }

        // Display the first one
        displayNewsArticle();
        
        // Auto-rotate 
        setInterval(nextNewsArticle, 30000);

    } catch (error) {
        console.error("News API error:", error);
    }
}

function displayNewsArticle() {
    const article = newsArticles[currentNewsIndex];

    // Fade-out animation
    const viewer = document.getElementById("newsViewer");
    viewer.classList.add("fade-out");

    setTimeout(() => {
        newsTitleEl.textContent = article.title;
        newsImageEl.src = article.image_url;
        newsLinkEl.href = article.link;
        newsLinkEl.textContent = "Read Full Story";

        viewer.classList.remove("fade-out");

    }, 500);
}

function nextNewsArticle() {
    currentNewsIndex = (currentNewsIndex + 1) % newsArticles.length;
    displayNewsArticle();
}



//quote

async function getQuote() {
  const response = await fetch("http://api.quotable.io/random");
  if (response.ok) {
    const data = await response.json();
   // console.log(data)
   quote.textContent = `${data.content} — ${data.author}`;
  } else {
    console.error("Error fetching quote");
  }
} 

getQuote();

 



 
  











loadNews();

loadWeather();
fetchJokes();
