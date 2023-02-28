const baseUrl = 'https://api.weatherapi.com/v1';

const apiKey = process.env.WEATHER_API_KEY;
const weatherapi = `${baseUrl}/current.json?key=${apiKey}`;

export async function getCurrentWeather(city: string) {
  const url = `${weatherapi}&q=${city}`;
  const response = await fetch(url);
  return await response.json();
}

const mockData = {
  location: {
    name: 'Da Nang',
    region: '',
    country: 'Vietnam',
    lat: 16.07,
    lon: 108.22,
    tz_id: 'Asia/Ho_Chi_Minh',
    localtime_epoch: 1677250583,
    localtime: '2023-02-24 21:56',
  },
  current: {
    last_updated_epoch: 1677249900,
    last_updated: '2023-02-24 21:45',
    temp_c: 22.0,
    temp_f: 71.6,
    is_day: 0,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
      code: 1003,
    },
    wind_mph: 2.2,
    wind_kph: 3.6,
    wind_degree: 10,
    wind_dir: 'N',
    pressure_mb: 1020.0,
    pressure_in: 30.12,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 83,
    cloud: 50,
    feelslike_c: 24.5,
    feelslike_f: 76.1,
    vis_km: 10.0,
    vis_miles: 6.0,
    uv: 1.0,
    gust_mph: 8.5,
    gust_kph: 13.7,
  },
};

export async function getCurrentWeatherMock(city: string) {
  return Promise.resolve(mockData);
}
