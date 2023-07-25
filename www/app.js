
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++   John Kono   +++++++++++++++++++ */
/* ++++++++++++++++++++    1911563    +++++++++++++++++++ */
/* ++ CM3131 Mobile Application Design and Development ++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


/* ionic pages */


// Home page
        const homeNav = document.querySelector('#home-nav');
        const homePage = document.querySelector('#home-page');
        homeNav.root = homePage;
        
 // History page     
        const HistoryNav = document.querySelector('#History-nav');
        const HistoryPage = document.querySelector('#History-page');
        HistoryNav.root = HistoryPage;

 // Map page      
        const MapNav = document.querySelector('#Map-nav');
        const MapPage = document.querySelector('#Map-page');
        MapNav.root = MapPage;

  // Weather page     
        const weatherNav = document.querySelector('#weather-nav');
        const weatherPage = document.querySelector('#weather-page');
        weatherNav.root = weatherPage;


     
/* ionic pages End */



/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */




/* leaflet Map */

// find me button
const pressedButton = document.querySelector('#btn-findme');
pressedButton.addEventListener('click', findMyLocation);


  
const myMap = document.getElementById("map");
const map = L.map('map');


map.setView([57.149651,  -2.09907], 12);


// open street map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // open street map copyright
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// resize map for ionic issue solusion
 const resize = new ResizeObserver(() => {
        map.invalidateSize();
      }, 12);
      
      resize.observe(myMap);

  
// shows bike hire points
 function mapPoints(){


// for loop for call all data from data.js and print on map
for (var a = 0; a < rentPointData.length; a++) {

    var printOnMap = rentPointData[a];

    printOnMap.addTo(map);
}

}

mapPoints();



// click on map and find position find as a Lat,lng
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);





// after permission marker and circle user location 
function myLocation(e){
    
            // radius provide an accurate device location
            var radius = e.accuracy / 2*4;
            // marker Location
            var marker = L.marker([e.latitude, e.longitude], radius).bindPopup('There You Are :)');
            // circle Location
            var circle = L.circle([e.latitude, e.longitude], radius, {
                weight: 1,
                // circle color
                color: 'red',
                // circle Opacity
                fillOpacity: 0.2,

                radius: 400
                
            });
            
            
        map.addLayer(marker);
        map.addLayer(circle);

           
        }


       // user not give permission to find user location 
    function  myLocationerror(e)
    {
        // alert method displays an alert box with a message and an OK button
     alert("Not authorized to use location services");
    }

    // user location not find error
    map.on('locationerror', myLocationerror);
        
        
    // user location found
    map.on('locationfound', myLocation);

        

   
// find user location 
   function findMyLocation()
    {
    
        // alert box Displays a popup with the message "Requesting Authorization to use Location Services"
    alert("Requesting Authorization to use Location Services");
      // locate user
      map.locate({setView: true, maxZoom: 16});
    }


    /* leaflet Map End */


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */



    /* Weather Api */


// print on screen function 
function PrintData(weatherdata){

    
   

       
    let mainWeatherData = document.querySelector ("#weather-results");
    
    
       
    


    //icon
    
     document.getElementById('weathericon').src = `http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`;
    
    
    // city 
    mainWeatherData.innerHTML= `<h2>${weatherdata.name}</h2>`;
    
    
    // Weather Repor
    let infoWeather = weatherdata.weather[0]
    if(infoWeather && infoWeather.description)
    {
       
    let weatherReport = document.createElement("h3");
    //add description also convert a string to uppercase letters
    weatherReport.textContent = infoWeather.description.toUpperCase();
    mainWeatherData.append(weatherReport);
    
    }
    
    
    // celsius
    
    let celsius = document.createElement("p");
    celsius.textContent = "Temperature Celsius:  "+ Math.round(weatherdata.main.temp) + " "+"°C";
    mainWeatherData.append(celsius);
    
    // fahrenheit
    let fahrenheit = document.createElement("p");
    fahrenheit.textContent = "Temperature Fahrenheit:  "+ Math.round((weatherdata['main']['temp']* 9/5 + 32)) + " "+"F";
    mainWeatherData.append(fahrenheit);
    
    // humidity
    let humidity = document.createElement("p");
    humidity.textContent = "Humidity:  "+ weatherdata.main.humidity + "%";
    mainWeatherData.append(humidity);
    
    
    // shows wind speed km/h and mph also wind speed degrees
    let windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed:  "+ Math.round((weatherdata.wind.speed * 3.6)) + " km/h" + " / "+ Math.round((weatherdata.wind.speed / 0.44704 ))+ " mph";
    mainWeatherData.append(windSpeed);

    // shows wind speed degrees
    let windSpeedDeg = document.createElement("p");
    windSpeedDeg.textContent = "Wind Speed Degrees: "+ weatherdata.wind.deg + "°";
    mainWeatherData.append(windSpeedDeg);
    
    
     // Output testing print all weather data in console
     console.log(weatherdata);



   
    }


   


    let searchbtn= document.getElementById("srcbtn");
    let addCity=document.getElementById("city");

    // get data function is fetch JSON, When the fetch is successful, we read data
    function getData(){

        let cityName = addCity.value;

    //var url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=3aad438e0e6d2414efcb5e578525c3ad&units=metric";
    
    // api key
    const apiKey="3aad438e0e6d2414efcb5e578525c3ad";
    // api url
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?q=";

     // if user not enter city name
    if (cityName.length == 0)
    {
        // Display default city
        cityName ="Aberdeen";
        // Displays a popup with the message "Please Enter City Name ..."
        alert("Please Enter City Name ...")
    }

    // selected city
    const apiCity= cityName;
    // fetch 
    fetch (apiUrl + apiCity + '&appid=' + apiKey + '&units=metric')
    .then((res) => res.json())
    .then((results) => PrintData(results));
    
    }
    
    searchbtn.addEventListener("click",getData);
    window.addEventListener("load",getData);
    //getData();


    /* Weather Api End */

    


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */






 /* Random User Api Start Start */
    


// print on screen function 
function PrintRandomUserData(randomUserdata){


    var mainUserData = document.querySelector ("#user-result");

      //picture
    
     document.getElementById('user-picture').src = `${randomUserdata.results[0].picture.large}`;

    
    
     // Title + User first Name + User Last Name 
     var userFullName = document.createElement("h3");
     userFullName.textContent = randomUserdata.results[0].name.title +"  "+ randomUserdata.results[0].name.first +"  "+ randomUserdata.results[0].name.last;
     mainUserData.append(userFullName);
     
     
     // User Email
     var userMail = document.createElement("p");
     userMail.textContent = randomUserdata.results[0].email;
     mainUserData.append(userMail);


      // User Mobile Number
      var userMobileNumber = document.createElement("p");
      userMobileNumber.textContent = randomUserdata.results[0].cell;
      mainUserData.append(userMobileNumber);

      // User Street Number and Name
      var userState = document.createElement("p");
      userState.textContent = randomUserdata.results[0].location.street.number + "  "+ randomUserdata.results[0].location.street.name;
      mainUserData.append(userState);


       // User Postcode
       var userPostcode = document.createElement("p");
       userPostcode.textContent = randomUserdata.results[0].location.postcode;
       mainUserData.append(userPostcode);

 
       // User City
       var userCity = document.createElement("p");
       userCity.textContent = randomUserdata.results[0].location.city;
       mainUserData.append(userCity);


       // User Country
       var userCountry = document.createElement("h3");
       userCountry.textContent = randomUserdata.results[0].location.country;
       mainUserData.append(userCountry);
      


     
   // Output for testing print random user data in console
   console.log(randomUserdata);
 
 }
 
 // get data function is fetch JSON, When the fetch is successful, we read data
 function getRandomUserData(query){
     
     // api url
     const apiUrl="https://randomuser.me/api/?nat=";
     // selected city
      const apiCountry="gb"
     // fetch 
     fetch (apiUrl+apiCountry)
     .then((res2) => res2.json())
     .then((data) => PrintRandomUserData(data));
     
     }
     
     getRandomUserData();


 
     /* User Start End */




/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */


     


     /* User History Data Start */

// gets user entered input data
const dateInput = document.getElementById('input-date');  
const timeInput = document.getElementById('input-time'); 
const rentpointInput = document.getElementById('input-rentpoint'); 
const caloriesburnedInput = document.getElementById('input-caloriesburned'); 
const usedminutesInput = document.getElementById('input-usedminutes'); 
const feeInput = document.getElementById('input-fee'); 



const printEnteredData = document.getElementById('printdata2'); 

const saveDataBtn = document.getElementById("savedtbtn");



// add data
function saveUserNewData() {
    printEnteredData.innerHTML = dateInput.value + " "+ timeInput.value + " "+ rentpointInput.value +" Hire Point"+" "+ caloriesburnedInput.value + " Kcal"+" "+ usedminutesInput.value +" min"+ " "+ "£"+feeInput.value;
    
    
    // clear all input text boxs
    document.getElementById('input-date').value = '';
    document.getElementById('input-time').value = '';
    document.getElementById('input-rentpoint').value = '';
    document.getElementById('input-caloriesburned').value = '';
    document.getElementById('input-usedminutes').value = '';
    document.getElementById('input-fee').value = '';

}








const printUserData = document.getElementById('printdata');

const getDataBtn = document.getElementById("btnlist");


getDataBtn.addEventListener('click', getUserData);

saveDataBtn.addEventListener('click', saveUserNewData);

 


// 
function getUserData(){
            
//  for loop for read array data
   for(let i=0; i<userData.length; i++){
        const output = JSON.stringify(userData[i]);
        // console printout 
        console.log(output);
        // local storage
        localStorage.setItem("recordJSON", output);


        // 
        let text = localStorage.getItem("recordJSON");
        let file = JSON.parse(text);
        const newItem = document.createElement('ion-item');
        newItem.textContent = file.date + " " +file.time + " " +file.rentpoint+ " " +file.caloriesburned+ " " + file.usedminutes+ " " +file.fee;
      

        printUserData.appendChild(newItem);

       

   }


}

/* User History Data End */



/* Date (D/M/Y) */

function getdate(){
const date = new Date();
let todayDate = date.toLocaleDateString();
 document.getElementById("demo").innerHTML = todayDate;
}


/* Date End */


     