function getWheather() {
  const apiKey = '71a7dab019dd66ba58fddeff05182778';
  const city = document.getElementById('cityInput').value; 
  const country = document.getElementById('countryInput').value;

  if (!city) {
    alert('Please enter a city');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('City and country not match');
      }
      return res.json();
    })
    .then(res => {
      if (city && country) {
        res.name = `${city}, ${country}`; 
      }

      const temperature = res.main.temp; 
      const feelsLike = res.main.feels_like; 
      const weatherCondition = res.weather[0].description;  
      const weatherId = res.weather[0].id; 
      const tempInCelsius = temperature - 273.15;
      const feelsLikeInCelsius = feelsLike - 273.15;

      console.log(res);

      document.getElementById('Temperature').textContent = `Temperature: ${tempInCelsius.toFixed(2)} °C`;
      document.getElementById('Feels like').textContent = `Feels like: ${feelsLikeInCelsius.toFixed(2)} °C`;
      document.getElementById('Weather condition').textContent = `Weather condition: ${weatherCondition}`;

      const emojiElement = document.getElementById('emojiIcon'); 
      let emoji = '';

      if (weatherId === 800) {
        emoji = '☀️'; 
      } else if (weatherId >= 801 && weatherId <= 804) {
        emoji = '☁️';
      } else if (weatherId >= 500 && weatherId <= 531) {
        emoji = '🌧️'; 
      } else if (weatherId >= 300 && weatherId <= 321) {
        emoji = '🌦️'; 
      } else if (weatherId >= 200 && weatherId <= 232) {     
        emoji = '⛈️';
      } else if (weatherId >= 600 && weatherId <= 622) {
        emoji = '❄️'; 
      } else if (weatherId >= 701 && weatherId <= 781) {
        emoji = '🌫️'; 
      } else {
        emoji = '🌍'; 
      }

      emojiElement.textContent = emoji;
    })
    .catch(error => {
      if (error.message === 'City and country not match') {
        alert('City and country not match. Please check the city and country names.');
      } else {
        console.error(error);
      }
    });
}
