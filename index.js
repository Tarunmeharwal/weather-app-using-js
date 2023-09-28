    const locationInput = document.getElementById('input');
    const getWeatherButton = document.getElementById('weather-btn');
    const weatherData = document.getElementById('weather-data');
    const errorDiv = document.getElementById('error');


    getWeatherButton.addEventListener('click', function () {
        const location = locationInput.value;
        const unit = document.querySelector('input[name="unit"]:checked').value;
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=74f89a649e67febe258c0f3553322c9f`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    let temperatureUnit;

                         if (unit === 'metric') {
                         temperatureUnit = '°C';
                        } else {
                        temperatureUnit = '°F';
                         }

                    weatherData.innerHTML = `
                        <p><i class="fa-solid fa-temperature-half"></i> Temperature: ${data.main.temp}${temperatureUnit}</p>
                        <p><i class="fa-solid fa-droplet"></i> Humidity: ${data.main.humidity}%</p>
                        <p><i class="fa-solid fa-wind"></i>  Wind Speed: ${data.wind.speed} m/s</p>
                        <p><i class="fa-solid fa-smog"></i> Weather Description: ${data.weather[0].description}</p>
                    `;
                    errorDiv.textContent = ''; 
                } else {
                    
                    errorDiv.textContent = `Error: ${data.message}`;
                    weatherData.innerHTML = ''; 
                }
            })
            .catch(error => {
        
                errorDiv.textContent = 'Error: Unable to connect.';
                weatherData.innerHTML = ''; 
            });
    });

