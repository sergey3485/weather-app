export interface FetchedWeather {
  current_condition: [CurrentCondition];
  nearest_area: [NearestArea];
  request: [Request];
  weather: [Weather];
}

interface CurrentCondition {
  FeelsLikeC: string;
  FeelsLikeF: string;
  cloudcover: string;
  humidity: string;
  lang_ru: [StandartObject];
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
  weatherDesc: [StandartObject];
  weatherIconUrl: [StandartObject];
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
}

interface NearestArea {
  areaName: [StandartObject];
  country: [StandartObject];
  latitude: string;
  longitude: string;
  population: string;
  region: [StandartObject];
  weatherUrl: [StandartObject];
}

interface Request {
  query: string;
  type: string;
}

interface Weather {
  astronomy: Astronomy[];
  avgtempC: string;
  avgtempF: string;
  date: string;
  hourly: Hourly[];
  maxtempC: string;
  maxtempF: string;
  mintempC: string;
  mintempF: string;
  sunHour: string;
  totalSnow_cm: string;
  uvIndex: string;
}
interface StandartObject {
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

interface Hourly {
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
  lang_ru: StandartObject[];
  precipInches: string;
  precipMM: string;
  pressure: string;
  pressureInches: string;
  tempC: string;
  tempF: string;
  time: string;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;
  weatherDesc: StandartObject[];
  weatherIconUrl: StandartObject[];
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
}

export interface UsefullData {
  position: string;
  temperature: string;
  weatherDescription: string;
}

export const fetchWeather = (text: string): Promise<UsefullData> => {
  const url = `http://wttr.in/${text}?format=j1`;

  const weatherData = fetch(url)
    .then((data) => data.json())
    .then((data: FetchedWeather): UsefullData => {
      const loc = `${data.nearest_area[0].region[0].value}, ${data.nearest_area[0].country[0].value}`;
      return {
        position: loc,
        temperature: data.current_condition[0].temp_C,
        weatherDescription: data.current_condition[0].weatherDesc[0].value,
      };
    });
    // eslint-disable-next-line no-console
    // .catch((error) => );

  return weatherData;
};
