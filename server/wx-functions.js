//returns an object with properties containing extracted JSON data
var wxDetails = data => {
    let currentTempString = (data.temp_f >= data.feelslike_f) ? data.temp_f : `${data.temp_f}°F : feels like ${data.feelslike_f}`;
    let currentTempStringC = (data.temp_c >= data.feelslike_c) ? data.temp_c : `${data.temp_c}°C : feels like ${data.feelslike_c}`;
    let windDirection = (data.wind_dir.length > 3) ? data.wind_dir.slice(0,1) : data.wind_dir;
    let currentWind = (data.wind_mph > 0) ? `${windDirection} ${data.wind_mph} Mph` : 'Calm';
    let currentWindGust = (data.wind_gust_mph > data.wind_mph) ? `${data.wind_gust_mph} Mph gusts` : 'No gusts';
    let currentWindK = (data.wind_kph > 0) ? `${windDirection} ${data.wind_kph} Kph` : 'Calm';
    let currentWindGustK = (data.wind_gust_kph > data.wind_kph) ? `${data.wind_gust_kph} Kph gusts` : 'No gusts';
    return {
        currentLocation: data.display_location.full,
        currentWx: data.weather,
        currentTempString,
        currentTempStringC,
        currentWind,
        currentWindGust,
        currentWindK,
        currentWindGustK,
        currentHumidity: data.relative_humidity,
        wxMoreDetails: data.forecast_url,
        lastUpdated: data.observation_time.replace(/^(Last Updated on )/i,'As of ')
    };
};

//use switch case to determine the CSS weather icon to use based on what JSON data shows
var getWxIcon = (wxicon, uv) => {
  switch (wxicon) {
    case 'chanceflurries':
      return 'wi wi-snow-wind';

    case 'chancerain':
      return 'wi wi-rain';

    case 'chancesleet':
      return 'wi wi-sleet';

    case 'chancesnow':
      return 'wi wi-snow';

    case 'chancetstorms':
      return 'wi wi-thunderstorm';
          
    //Clear conditions are tricky to handle as they may occur anytime, so we will
    //use UV index to determine if we should use the sun icon or the moon icon.
    case 'clear':
      if (uv > 0) {
        return 'wi wi-day-sunny';  
      } else if (uv == 0 || !uv) {
        return 'wi wi-night-clear';  
      }

    case 'cloudy':
      return 'wi wi-cloudy';

    case 'flurries':
      return 'wi wi-snow';

    case 'fog':
      return 'wi wi-fog';

    case 'hazy':
      return 'wi wi-day-haze';

    case 'mostlycloudy':
      return 'wi wi-cloudy';

    case 'mostlysunny':
      return 'wi wi-day-sunny-overcast';

    case 'overcast':
      return 'wi wi-cloudy';

    case 'partlycloudy':
      return 'wi wi-cloudy';

    case 'partlysunny':
      return 'wi wi-day-cloudy';

    case 'rain':
      return 'wi wi-rain';

    case 'sleet':
      return 'wi wi-sleet';

    case 'snow':
      return 'wi wi-snow';

    case 'sunny':
      return 'wi wi-day-sunny';

    case 'tstorms':
      return 'wi wi-storm-showers';

    case 'unknown':
      return 'wi wi-na';
  }
};

module.exports = {wxDetails, getWxIcon};
