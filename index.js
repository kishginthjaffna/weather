const weatherForm = document.querySelector(".weatherForm");
const cityInput= document.querySelector(".inputDisplay");
const weatherDisplay = document.querySelector(".weatherDisplay");
const errorDisplay = document.querySelector(".errorMessage");
const apiKey = "1a36dfec5045c2749952ccded792b4da"; 

weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); //Prevent Default function of Form (eg: refreshing after submission)

    const city = cityInput.value;

    if(!city){
        errorDisplay.textContent = "*Please Enter a city";
    } else {

        try{
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);

        } catch (error){
            errorDisplay.textContent = error;
        }
        
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response){
        errorDisplay.textContent = "Couldn't fetch the data";
    }

    return await response.json();
}

function displayWeatherData(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]}= data;

    weatherDisplay.textContent="";
    weatherDisplay.style.display = "flex";
    weatherDisplay.classList.add("weatherDisplay");

    const cityDisplay = document.createElement("h1");
    cityDisplay.classList.add("cityDisplay");
    cityDisplay.textContent = city;
    weatherDisplay.appendChild(cityDisplay);

    const tempDisplay = document.createElement("h1");
    tempDisplay.classList.add("cityDisplay");
    tempDisplay.textContent = `${(temp-273.15).toFixed(2)}°C`;
    weatherDisplay.appendChild(tempDisplay);

    const humidityDisplay = document.createElement("p");
    humidityDisplay.classList.add("humidityDisplay");
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    weatherDisplay.appendChild(humidityDisplay);

    const iconDisplay = document.createElement("p");
    iconDisplay.classList.add("iconDisplay");
    iconDisplay.innerHTML= getDisplayIcon(id);
    weatherDisplay.appendChild(iconDisplay);

    const descriptionDisplay = document.createElement("p");
    descriptionDisplay.classList.add("descriptionDisplay");
    descriptionDisplay.textContent = description.toString().charAt(0).toUpperCase() + description.slice(1);
    weatherDisplay.appendChild(descriptionDisplay);
}

function getDisplayIcon(weatherId){

    let iconClass = "";

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            iconClass = "bi bi-lightning";
            break;

        case (weatherId >= 300 && weatherId < 500):
            iconClass = "bi bi-cloud-drizzle-fill";
            break;

        case (weatherId >= 500 && weatherId < 600):
            iconClass = "bi bi-cloud-lightning-rain-fill";
            break;

        case (weatherId >= 600 && weatherId <= 700):
            iconClass = "bi bi-snow";
            break;

        case (weatherId >= 701 && weatherId < 800):
            iconClass = "bi bi-tornado";
            break;

        case (weatherId = 800):
            iconClass = "bi bi-brightness-high-fill";
            break;

        case (weatherId > 800):
            iconClass = "bi bi-cloud-fill";
            break;

        default:
            break;
    } 
    
    return `<i class="${iconClass}"></i>`;
}
