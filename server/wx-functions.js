//returns an object with properties containing extracted JSON data
var wxDetails = (d) => {
    return {
        currentLocation: d.display_location.full,
        currentWx: d.weather,
        currentTemp: d.temp_f,
        currentTempC: d.temp_c,
        currentFeelsTemp: d.feelslike_f,
        currentFeelsTempC: d.feelslike_c,
        currentWind: (d.wind_mph > 0) ? `${d.wind_mph} Mph ${d.wind_dir}` : 'Calm',
        currentWindGust: (d.wind_gust_mph > d.wind_mph) ? `gusts ${d.wind_gust_mph} Mph` : 'no gusting',
        currentWindK: (d.wind_kph > 0) ? `${d.wind_kph} Kph ${d.wind_dir}` : 'Calm',
        currentWindGustK: (d.wind_gust_kph > d.wind_kph) ? `gusts ${d.wind_gust_kph} Kph` : 'no gusting',
        wxMoreDetails: d.forecast_url        
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
