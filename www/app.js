
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++   John Kono   +++++++++++++++++++ */
/* ++++++++++++++++++++    1911563    +++++++++++++++++++ */
/* ++ CM3131 Mobile Application Design and Development ++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


/* ionic pages */



        const homeNav = document.querySelector('#home-nav');
        const homePage = document.querySelector('#home-page');
        homeNav.root = homePage;
      
        const HistoryNav = document.querySelector('#History-nav');
        const HistoryPage = document.querySelector('#History-page');
        HistoryNav.root = HistoryPage;
      
        const MapNav = document.querySelector('#Map-nav');
        const MapPage = document.querySelector('#Map-page');
        MapNav.root = MapPage;
      
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

  
// shows on map city center and bike hire points
 function mapPoints(){

/* Aberdeen City Center */
var aberdeen = L.marker([57.149651, -2.09907]).bindPopup('Aberdeen City Center').addTo(map);

/* Robert Gordon University Bike Hire Point */
var rgu = L.marker([57.1189, -2.1379]).bindPopup('Robert Gordon University Bike Hire Point').addTo(map);

/* Aberdeen city council bike hire point position */
var council_1 = L.marker([57.13143, -2.117009]).bindPopup('Aberdeen City Council Bike Hire Point').addTo(map);

/* Aberdeen University bike hire point position */
var council_1 = L.marker([57.1648, -2.1015]).bindPopup('Aberdeen University Bike Hire Point').addTo(map);

}

mapPoints();



// click on map and find position and find Lat,lng
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
            var radius = e.accuracy / 6;
            // marker Location
            var marker = L.marker([e.latitude, e.longitude], radius).bindPopup('There You Are :)');
            // circle Location
            var circle = L.circle([e.latitude, e.longitude], radius, {
                weight: 1,
                // circle color
                color: 'red',
                // circle Opacity
                fillOpacity: 0.2
                
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

    
    map.on('locationerror', myLocationerror);
        
        
    
    map.on('locationfound', myLocation);

        

   
// find user location 
   function findMyLocation()
    {
    // alert method displays an alert box with a message and an OK button
      alert("Requesting Authorization to use Location Services");
      // locate user
      map.locate({setView: true, maxZoom: 16});
    }


    /* leaflet Map End */


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */



    /* Weather Api */


// print on screen function 
function PrintData(weatherdata){

    
   

       
    var mainWeatherData = document.querySelector ("#weather-results");
    
    //icon
    
     document.getElementById('weathericon').src = `http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`;
    
    
    // city 
    var city = document.createElement("h2");
    city.textContent = weatherdata.name;
    mainWeatherData.append(city);
    
    
    // Weather Repor
    var infoWeather = weatherdata.weather[0]
    if(infoWeather && infoWeather.description)
    {
       
    var weatherReport = document.createElement("h3");
    //add description also convert a string to uppercase letters
    weatherReport.textContent = infoWeather.description.toUpperCase();
    mainWeatherData.append(weatherReport);
    
    }
    
    
    // celsius
    
    var celsius = document.createElement("p");
    celsius.textContent = "Temperature Celsius:  "+ Math.round(weatherdata.main.temp) + " "+"°C";
    mainWeatherData.append(celsius);
    
    // fahrenheit
    var fahrenheit = document.createElement("p");
    fahrenheit.textContent = "Temperature Fahrenheit:  "+ Math.round((weatherdata['main']['temp']* 9/5 + 32)) + " "+"F";
    mainWeatherData.append(fahrenheit);
    
    // humidity
    var humidity = document.createElement("p");
    humidity.textContent = "Humidity:  "+ weatherdata.main.humidity + "%";
    mainWeatherData.append(humidity);
    
    
    // shows wind speed km/h and mph also wind speed degrees
    var windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed:  "+ Math.round((weatherdata.wind.speed * 3.6)) + " km/h" + " / "+ Math.round((weatherdata.wind.speed / 0.44704 ))+ " mph";
    mainWeatherData.append(windSpeed);

    // shows wind speed degrees
    var windSpeedDeg = document.createElement("p");
    windSpeedDeg.textContent = "Wind Speed Degrees: "+ weatherdata.wind.deg + "°";
    mainWeatherData.append(windSpeedDeg);
    
    
     // for testing show all weather data in console
     console.log(weatherdata);
         
    }
    
       
    
    
    // get data function is fetch JSON, When the fetch is successful, we read data
    function getData(query){

    //var url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=3aad438e0e6d2414efcb5e578525c3ad&units=metric";
    
    // api key
    const apiKey="3aad438e0e6d2414efcb5e578525c3ad";
    // api url
    const apiUrl="https://api.openweathermap.org/data/2.5/weather?q=";
    // selected city
    const apiCity="Aberdeen,GB"
    // fetch 
    fetch (apiUrl+apiCity+'&appid='+ apiKey + '&units=metric')
    .then((res) => res.json())
    .then((results) => PrintData(results));
    
    }
    
    getData();


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
     
     
     
     /*
     // Title + User first Name + User Last Name 
     var userTitle = document.createElement("p");
     userTitle.textContent = randomUserdata.results[0].name.title ;
     mainUserData.append(userTitle);
 
    
     // User first Name 
    var userFirstName = document.createElement("p");
    userFirstName.textContent = randomUserdata.results[0].name.first;
    mainUserData.append(userFirstName);

    // User Last Name 
    var userLastName = document.createElement("p");
    userLastName.textContent = randomUserdata.results[0].name.last;
    mainUserData.append(userLastName);
*/

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

      

        


        


     
   // for testing show all weather data in console
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


     


     /* History Data Start */

const printUserData = document.getElementById('printdata');

const getDataBtn = document.getElementById("btnlist");


getDataBtn.addEventListener('click', getUserData);





function getUserData(){
           // set data:
        
          


   for(let i=0; i<userData.length; i++){
        const output = JSON.stringify(userData[i]);
        console.log(output);
        localStorage.setItem("recordJSON", output);


        // get data:
        let text = localStorage.getItem("recordJSON");
        let obj = JSON.parse(text);
        const newItem = document.createElement('ion-item');
        newItem.textContent = obj.date + " " +obj.time + " " +obj.rentpoint+ " " +obj.caloriesburned+ " " +obj.hours+ " " +obj.fee;
      

        printUserData.appendChild(newItem);

   }


}

/* History End */



     