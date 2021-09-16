export interface FetchedWeather {
  current_condition: [CurrentCondition];
  nearest_area: [NearestArea];
  request: [Request];
  weather: DailyWeather[];
}

interface CurrentCondition {
  FeelsLikeC: string;
  FeelsLikeF: string;
  cloudcover: string;
  humidity: string;
  lang_ru: [WeatherStandartObject];
  localObsDateTime: string;
  observation_time: string;
  precipInches: string;
  precipMM: string;
  pressure: string;
  pressureInches: string;
  temp_C: string;
  temp_F: string;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;
  weatherDesc: [WeatherStandartObject];
  weatherIconUrl: [WeatherStandartObject];
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
}

interface NearestArea {
  areaName: [WeatherStandartObject];
  country: [WeatherStandartObject];
  latitude: string;
  longitude: string;
  population: string;
  region: [WeatherStandartObject];
  weatherUrl: [WeatherStandartObject];
}

interface Request {
  query: string;
  type: string;
}

interface DailyWeather {
  astronomy: Astronomy[];
  avgtempC: string;
  avgtempF: string;
  date: string;
  hourly: HourlyWeather[];
  maxtempC: string;
  maxtempF: string;
  mintempC: string;
  mintempF: string;
  sunHour: string;
  totalSnow_cm: string;
  uvIndex: string;
}

interface WeatherStandartObject {
  value: string;
}

interface Astronomy {
  moon_illumination: string;
  moon_phase: string;
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
}

export interface HourlyWeather {
  DewPointC: string;
  DewPointF: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  HeatIndexC: string;
  HeatIndexF: string;
  WindChillC: string;
  WindChillF: string;
  WindGustKmph: string;
  WindGustMiles: string;
  chanceoffog: string;
  chanceoffrost: string;
  chanceofhightemp: string;
  chanceofovercast: string;
  chanceofrain: string;
  chanceofremdry: string;
  chanceofsnow: string;
  chanceofsunshine: string;
  chanceofthunder: string;
  chanceofwindy: string;
  cloudcover: string;
  humidity: string;
  lang_ru: WeatherStandartObject[];
  precipInches: string;
  precipMM: string;
  pressure: string;
  pressureInches: string;
  tempC: string;
  tempF: string;
  time: string | Date;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;
  weatherDesc: WeatherStandartObject[];
  weatherIconUrl: WeatherStandartObject[];
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
}

export interface Weather {
  position: string;
  icon: string;
  temperature: string;
  weatherDescription: string;
  hourlyWeather: HourlyWeather[];
}

const changeTime = (weather: DailyWeather): HourlyWeather[] => {
  const gap = 3 * 60 * 60 * 1000;
  const date = new Date(weather.date);

  const changedArray = weather.hourly.map((item, index) => {
    return {
      ...item,
      time: new Date(+date + (gap * index)),
    };
  });

  return changedArray;
};
const changeData = (data:FetchedWeather):Weather => {
  const loc = `${data.nearest_area[0].region[0].value}, ${data.nearest_area[0].country[0].value}`;
  return {
    position: loc,
    icon: data.current_condition[0].weatherCode,
    temperature: data.current_condition[0].temp_C,
    weatherDescription: data.current_condition[0].weatherDesc[0].value,
    hourlyWeather: [...changeTime(data.weather[0]), ...changeTime(data.weather[1])],
  };
};

export const fetchWeather = async (text: string): Promise<Weather> => {
  const url = `https://wttr.in/${text}?format=j1`;
  const fetchedData = await fetch(url);
  const commits = await fetchedData.json() as FetchedWeather;
  const weatherData = changeData(commits);

  return weatherData;
};
