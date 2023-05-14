const apikey = "ed296f0d028649329f43c2e1fc77743e";
const weatherDataE1  = document.getElementById('weather-data')
const cityInputE1 = document.getElementById('city-input')
const formE1 = document.querySelector('form');
formE1.addEventListener('submit',(event)=>{
    event.preventDefault();
    const cityValue = cityInputE1.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("network response was not ok ....")
        }
        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;

        const icon = data.weather[0].icon;
        const details = [
            `feels like : ${Math.round(data.main.feels_like)}°C`,
            `humidity : ${data.main.humidity} %`,
            `wind speed :  ${data.wind.speed} m/s`,
        ]

        weatherDataE1.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`
        weatherDataE1.querySelector('.temperature').textContent =`${temperature}°C`;
        weatherDataE1.querySelector('.description').textContent = `${description}`


        weatherDataE1.querySelector('.details').innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("")

    } catch (error) {
    }
}

