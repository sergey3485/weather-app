import Sunny from '../assets/weather-icons/wi-day-sunny.svg';
import PartlyCloudy from '../assets/weather-icons/wi-day-cloudy.svg';
import Cloudy from '../assets/weather-icons/wi-cloud.svg';
import VeryCloudy from '../assets/weather-icons/wi-cloudy.svg';
import Fog from '../assets/weather-icons/wi-fog.svg';
import LightShowers from '../assets/weather-icons/wi-day-showers.svg';
import HeavyShowers from '../assets/weather-icons/wi-showers.svg';
import LightSleet from '../assets/weather-icons/wi-day-sleet.svg';
import LightSleetShowers from '../assets/weather-icons/wi-day-rain-mix.svg';
import LightSnow from '../assets/weather-icons/wi-day-snow.svg';
import HeavySnow from '../assets/weather-icons/wi-snow.svg';
import LightRain from '../assets/weather-icons/wi-day-rain.svg';
import HeavyRain from '../assets/weather-icons/wi-rain.svg';
import LightSnowShowers from '../assets/weather-icons/wi-day-snow-wind.svg';
import HeavySnowShowers from '../assets/weather-icons/wi-snow-wind.svg';
import ThunderyShowers from '../assets/weather-icons/wi-day-storm-showers.svg';
import ThunderyHeavyRain from '../assets/weather-icons/wi-storm-showers.svg';
import ThunderySnowShowers from '../assets/weather-icons/wi-day-thunderstorm.svg';

export const ICON_CODES: Record<string, string> = {
  113: Sunny,
  116: PartlyCloudy,
  119: Cloudy,
  122: VeryCloudy,
  143: Fog,
  176: LightShowers,
  179: LightSleetShowers,
  182: LightSleet,
  185: LightSleet,
  200: ThunderyShowers,
  227: LightSnow,
  230: HeavySnow,
  248: Fog,
  260: Fog,
  263: LightShowers,
  266: LightRain,
  281: LightSleet,
  284: LightSleet,
  293: LightRain,
  296: LightRain,
  299: HeavyShowers,
  302: HeavyRain,
  305: HeavyShowers,
  308: HeavyRain,
  311: LightSleet,
  314: LightSleet,
  317: LightSleet,
  320: LightSnow,
  323: LightSnowShowers,
  326: LightSnowShowers,
  329: HeavySnow,
  332: HeavySnow,
  335: HeavySnowShowers,
  338: HeavySnow,
  350: LightSleet,
  353: LightShowers,
  356: HeavyShowers,
  359: HeavyRain,
  362: LightSleetShowers,
  365: LightSleetShowers,
  368: LightSnowShowers,
  371: HeavySnowShowers,
  374: LightSleetShowers,
  377: LightSleet,
  386: ThunderyShowers,
  389: ThunderyHeavyRain,
  392: ThunderySnowShowers,
  395: HeavySnowShowers,
};
