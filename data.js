// ============================================================
//  WEATHER DATA — 10 Kota Besar Indonesia
//  Data prakiraan 10 hari: 13 Oktober – 22 Oktober 2026
//  Referensi pola cuaca: BMKG, AccuWeather, Weather.com
// ============================================================

const CITIES = [
  { id: "jakarta",    name: "Jakarta",    province: "DKI Jakarta",       lat: -6.2,   lon: 106.8, emoji: "🏙️" },
  { id: "surabaya",  name: "Surabaya",   province: "Jawa Timur",        lat: -7.25,  lon: 112.75, emoji: "⚓" },
  { id: "bandung",   name: "Bandung",    province: "Jawa Barat",        lat: -6.91,  lon: 107.6,  emoji: "🌸" },
  { id: "medan",     name: "Medan",      province: "Sumatera Utara",    lat: 3.59,   lon: 98.67,  emoji: "🌴" },
  { id: "semarang",  name: "Semarang",   province: "Jawa Tengah",       lat: -6.97,  lon: 110.42, emoji: "🌊" },
  { id: "makassar",  name: "Makassar",   province: "Sulawesi Selatan",  lat: -5.14,  lon: 119.43, emoji: "🦅" },
  { id: "palembang", name: "Palembang",  province: "Sumatera Selatan",  lat: -2.99,  lon: 104.76, emoji: "🌿" },
  { id: "denpasar",  name: "Denpasar",   province: "Bali",              lat: -8.65,  lon: 115.22, emoji: "🌺" },
  { id: "yogyakarta",name: "Yogyakarta", province: "D.I. Yogyakarta",   lat: -7.79,  lon: 110.37, emoji: "🏯" },
  { id: "manado",    name: "Manado",     province: "Sulawesi Utara",    lat: 1.49,   lon: 124.84, emoji: "🐚" },
];

// Weather condition definitions
const CONDITIONS = {
  sunny:        { label: "Cerah",              icon: "☀️",  bg: "sunny"   },
  partly:       { label: "Cerah Berawan",       icon: "⛅",  bg: "partly"  },
  cloudy:       { label: "Berawan",             icon: "☁️",  bg: "cloudy"  },
  light_rain:   { label: "Hujan Ringan",        icon: "🌦️",  bg: "rain"    },
  rain:         { label: "Hujan Sedang",        icon: "🌧️",  bg: "rain"    },
  heavy_rain:   { label: "Hujan Lebat",         icon: "⛈️",  bg: "storm"   },
  thunderstorm: { label: "Hujan Petir",         icon: "🌩️",  bg: "storm"   },
  foggy:        { label: "Berkabut",            icon: "🌫️",  bg: "cloudy"  },
  drizzle:      { label: "Gerimis",             icon: "🌂",  bg: "rain"    },
};

// Day labels (starting Oct 13)
function getDayLabels() {
  const days = [];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const monthNames = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"];
  const base = new Date(2026, 9, 13); // Oct 13 2026
  for (let i = 0; i < 10; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push({
      short: i === 0 ? "Hari Ini" : (i === 1 ? "Besok" : dayNames[d.getDay()]),
      full:  `${d.getDate()} ${monthNames[d.getMonth()]}`,
    });
  }
  return days;
}

// ============================================================
//  10-DAY FORECAST DATA PER CITY
// ============================================================
const FORECAST_DATA = {

  jakarta: {
    current: {
      temp: 31, feel: 35, humidity: 78, wind: 14, visibility: 8,
      pressure: 1008, uv: 7, rain: 2.1, sunrise: "05:49", sunset: "17:58",
      aqi: 112, condition: "partly",
    },
    hourly: [
      { hour: "00.00", temp: 27, icon: "🌙", rain: 0 },
      { hour: "03.00", temp: 26, icon: "🌙", rain: 0 },
      { hour: "06.00", temp: 27, icon: "🌅", rain: 10 },
      { hour: "09.00", temp: 30, icon: "⛅", rain: 20 },
      { hour: "12.00", temp: 33, icon: "☀️", rain: 5  },
      { hour: "15.00", temp: 31, icon: "🌦️", rain: 40 },
      { hour: "18.00", temp: 29, icon: "🌧️", rain: 60 },
      { hour: "21.00", temp: 28, icon: "🌙", rain: 15 },
    ],
    daily: [
      { condition: "partly",       high: 33, low: 26, rain: 20, wind: 14 },
      { condition: "light_rain",   high: 31, low: 25, rain: 65, wind: 16 },
      { condition: "rain",         high: 29, low: 24, rain: 80, wind: 20 },
      { condition: "thunderstorm", high: 28, low: 24, rain: 90, wind: 25 },
      { condition: "cloudy",       high: 30, low: 25, rain: 40, wind: 15 },
      { condition: "partly",       high: 32, low: 26, rain: 25, wind: 13 },
      { condition: "sunny",        high: 34, low: 27, rain: 10, wind: 11 },
      { condition: "sunny",        high: 34, low: 27, rain: 5,  wind: 10 },
      { condition: "partly",       high: 33, low: 26, rain: 20, wind: 12 },
      { condition: "light_rain",   high: 30, low: 25, rain: 55, wind: 17 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

  surabaya: {
    current: {
      temp: 34, feel: 38, humidity: 72, wind: 18, visibility: 10,
      pressure: 1010, uv: 9, rain: 0, sunrise: "05:30", sunset: "17:35",
      aqi: 87, condition: "sunny",
    },
    hourly: [
      { hour: "00.00", temp: 28, icon: "🌙", rain: 0  },
      { hour: "03.00", temp: 27, icon: "🌙", rain: 0  },
      { hour: "06.00", temp: 28, icon: "🌅", rain: 0  },
      { hour: "09.00", temp: 32, icon: "☀️", rain: 5  },
      { hour: "12.00", temp: 36, icon: "☀️", rain: 0  },
      { hour: "15.00", temp: 35, icon: "⛅", rain: 15 },
      { hour: "18.00", temp: 31, icon: "🌦️", rain: 30 },
      { hour: "21.00", temp: 29, icon: "🌙", rain: 5  },
    ],
    daily: [
      { condition: "sunny",      high: 36, low: 27, rain: 5,  wind: 18 },
      { condition: "sunny",      high: 37, low: 28, rain: 5,  wind: 16 },
      { condition: "partly",     high: 35, low: 27, rain: 20, wind: 15 },
      { condition: "partly",     high: 34, low: 26, rain: 25, wind: 14 },
      { condition: "light_rain", high: 32, low: 25, rain: 50, wind: 19 },
      { condition: "rain",       high: 30, low: 24, rain: 75, wind: 22 },
      { condition: "partly",     high: 33, low: 25, rain: 30, wind: 16 },
      { condition: "sunny",      high: 35, low: 26, rain: 10, wind: 14 },
      { condition: "sunny",      high: 36, low: 27, rain: 5,  wind: 13 },
      { condition: "partly",     high: 34, low: 26, rain: 20, wind: 15 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

  bandung: {
    current: {
      temp: 24, feel: 23, humidity: 85, wind: 9, visibility: 6,
      pressure: 920, uv: 4, rain: 4.5, sunrise: "05:44", sunset: "17:51",
      aqi: 55, condition: "foggy",
    },
    hourly: [
      { hour: "00.00", temp: 19, icon: "🌫️", rain: 5  },
      { hour: "03.00", temp: 18, icon: "🌫️", rain: 10 },
      { hour: "06.00", temp: 19, icon: "🌫️", rain: 15 },
      { hour: "09.00", temp: 22, icon: "⛅", rain: 20 },
      { hour: "12.00", temp: 25, icon: "⛅", rain: 30 },
      { hour: "15.00", temp: 23, icon: "🌦️", rain: 55 },
      { hour: "18.00", temp: 21, icon: "🌧️", rain: 70 },
      { hour: "21.00", temp: 20, icon: "🌙", rain: 20 },
    ],
    daily: [
      { condition: "foggy",        high: 25, low: 18, rain: 55, wind: 9  },
      { condition: "cloudy",       high: 24, low: 17, rain: 60, wind: 10 },
      { condition: "rain",         high: 22, low: 17, rain: 80, wind: 12 },
      { condition: "thunderstorm", high: 21, low: 16, rain: 90, wind: 15 },
      { condition: "light_rain",   high: 23, low: 17, rain: 60, wind: 11 },
      { condition: "partly",       high: 25, low: 18, rain: 30, wind: 8  },
      { condition: "partly",       high: 26, low: 18, rain: 25, wind: 8  },
      { condition: "cloudy",       high: 24, low: 17, rain: 45, wind: 9  },
      { condition: "rain",         high: 22, low: 16, rain: 75, wind: 13 },
      { condition: "foggy",        high: 21, low: 16, rain: 50, wind: 10 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

  medan: {
    current: {
      temp: 29, feel: 32, humidity: 88, wind: 11, visibility: 7,
      pressure: 1004, uv: 6, rain: 6.2, sunrise: "06:01", sunset: "18:12",
      aqi: 78, condition: "light_rain",
    },
    hourly: [
      { hour: "00.00", temp: 25, icon: "🌙",  rain: 15 },
      { hour: "03.00", temp: 24, icon: "🌙",  rain: 20 },
      { hour: "06.00", temp: 25, icon: "🌦️", rain: 40 },
      { hour: "09.00", temp: 28, icon: "⛅",  rain: 25 },
      { hour: "12.00", temp: 31, icon: "🌦️", rain: 35 },
      { hour: "15.00", temp: 30, icon: "🌧️", rain: 60 },
      { hour: "18.00", temp: 27, icon: "🌧️", rain: 70 },
      { hour: "21.00", temp: 26, icon: "🌙",  rain: 30 },
    ],
    daily: [
      { condition: "light_rain",   high: 31, low: 24, rain: 65, wind: 11 },
      { condition: "rain",         high: 30, low: 23, rain: 75, wind: 13 },
      { condition: "thunderstorm", high: 28, low: 22, rain: 85, wind: 17 },
      { condition: "rain",         high: 28, low: 22, rain: 80, wind: 15 },
      { condition: "light_rain",   high: 30, low: 23, rain: 60, wind: 12 },
      { condition: "partly",       high: 32, low: 24, rain: 30, wind: 10 },
      { condition: "partly",       high: 33, low: 24, rain: 25, wind: 9  },
      { condition: "cloudy",       high: 31, low: 23, rain: 40, wind: 11 },
      { condition: "light_rain",   high: 30, low: 23, rain: 60, wind: 13 },
      { condition: "rain",         high: 29, low: 22, rain: 70, wind: 14 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

  semarang: {
    current: {
      temp: 32, feel: 35, humidity: 74, wind: 15, visibility: 9,
      pressure: 1009, uv: 8, rain: 0.8, sunrise: "05:37", sunset: "17:45",
      aqi: 94, condition: "partly",
    },
    hourly: [
      { hour: "00.00", temp: 27, icon: "🌙", rain: 0  },
      { hour: "03.00", temp: 26, icon: "🌙", rain: 0  },
      { hour: "06.00", temp: 27, icon: "🌅", rain: 5  },
      { hour: "09.00", temp: 30, icon: "⛅", rain: 15 },
      { hour: "12.00", temp: 34, icon: "☀️", rain: 10 },
      { hour: "15.00", temp: 33, icon: "🌦️", rain: 35 },
      { hour: "18.00", temp: 30, icon: "🌧️", rain: 50 },
      { hour: "21.00", temp: 28, icon: "🌙", rain: 10 },
    ],
    daily: [
      { condition: "partly",     high: 34, low: 26, rain: 25, wind: 15 },
      { condition: "partly",     high: 33, low: 25, rain: 30, wind: 14 },
      { condition: "light_rain", high: 31, low: 25, rain: 55, wind: 17 },
      { condition: "rain",       high: 29, low: 24, rain: 75, wind: 20 },
      { condition: "cloudy",     high: 30, low: 24, rain: 40, wind: 16 },
      { condition: "partly",     high: 32, low: 25, rain: 20, wind: 13 },
      { condition: "sunny",      high: 35, low: 26, rain: 5,  wind: 12 },
      { condition: "sunny",      high: 35, low: 26, rain: 5,  wind: 11 },
      { condition: "partly",     high: 33, low: 25, rain: 20, wind: 13 },
      { condition: "light_rain", high: 30, low: 24, rain: 50, wind: 16 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

  makassar: {
    current: {
      temp: 33, feel: 36, humidity: 70, wind: 20, visibility: 12,
      pressure: 1011, uv: 10, rain: 0, sunrise: "05:50", sunset: "17:55",
      aqi: 42, condition: "sunny",
    },
    hourly: [
      { hour: "00.00", temp: 28, icon: "🌙", rain: 0 },
      { hour: "03.00", temp: 27, icon: "🌙", rain: 0 },
      { hour: "06.00", temp: 28, icon: "🌅", rain: 0 },
      { hour: "09.00", temp: 31, icon: "☀️", rain: 0 },
      { hour: "12.00", temp: 35, icon: "☀️", rain: 0 },
      { hour: "15.00", temp: 34, icon: "☀️", rain: 5  },
      { hour: "18.00", temp: 31, icon: "⛅", rain: 10 },
      { hour: "21.00", temp: 29, icon: "🌙", rain: 0  },
    ],
    daily: [
      { condition: "sunny",      high: 35, low: 27, rain: 5,  wind: 20 },
      { condition: "sunny",      high: 36, low: 27, rain: 5,  wind: 19 },
      { condition: "sunny",      high: 36, low: 28, rain: 0,  wind: 18 },
      { condition: "partly",     high: 35, low: 27, rain: 15, wind: 17 },
      { condition: "partly",     high: 34, low: 26, rain: 20, wind: 18 },
      { condition: "light_rain", high: 32, low: 25, rain: 50, wind: 22 },
      { condition: "rain",       high: 30, low: 24, rain: 70, wind: 24 },
      { condition: "partly",     high: 33, low: 25, rain: 25, wind: 19 },
      { condition: "sunny",      high: 35, low: 26, rain: 10, wind: 17 },
      { condition: "sunny",      high: 36, low: 27, rain: 5,  wind: 16 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

  palembang: {
    current: {
      temp: 30, feel: 34, humidity: 82, wind: 12, visibility: 7,
      pressure: 1006, uv: 6, rain: 3.8, sunrise: "05:52", sunset: "18:00",
      aqi: 130, condition: "cloudy",
    },
    hourly: [
      { hour: "00.00", temp: 25, icon: "☁️", rain: 10 },
      { hour: "03.00", temp: 24, icon: "🌙", rain: 5  },
      { hour: "06.00", temp: 25, icon: "☁️", rain: 20 },
      { hour: "09.00", temp: 28, icon: "☁️", rain: 30 },
      { hour: "12.00", temp: 32, icon: "⛅", rain: 20 },
      { hour: "15.00", temp: 31, icon: "🌦️", rain: 50 },
      { hour: "18.00", temp: 28, icon: "🌧️", rain: 65 },
      { hour: "21.00", temp: 26, icon: "☁️", rain: 25 },
    ],
    daily: [
      { condition: "cloudy",       high: 32, low: 24, rain: 50, wind: 12 },
      { condition: "light_rain",   high: 31, low: 23, rain: 65, wind: 13 },
      { condition: "rain",         high: 29, low: 23, rain: 80, wind: 16 },
      { condition: "thunderstorm", high: 28, low: 22, rain: 90, wind: 20 },
      { condition: "rain",         high: 29, low: 23, rain: 75, wind: 17 },
      { condition: "cloudy",       high: 31, low: 24, rain: 45, wind: 13 },
      { condition: "partly",       high: 32, low: 24, rain: 30, wind: 11 },
      { condition: "partly",       high: 33, low: 25, rain: 25, wind: 10 },
      { condition: "cloudy",       high: 31, low: 24, rain: 40, wind: 12 },
      { condition: "light_rain",   high: 30, low: 23, rain: 60, wind: 14 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

  denpasar: {
    current: {
      temp: 30, feel: 33, humidity: 76, wind: 16, visibility: 11,
      pressure: 1012, uv: 9, rain: 0, sunrise: "06:01", sunset: "17:59",
      aqi: 38, condition: "sunny",
    },
    hourly: [
      { hour: "00.00", temp: 25, icon: "🌙", rain: 0  },
      { hour: "03.00", temp: 24, icon: "🌙", rain: 0  },
      { hour: "06.00", temp: 25, icon: "🌅", rain: 0  },
      { hour: "09.00", temp: 28, icon: "☀️", rain: 5  },
      { hour: "12.00", temp: 32, icon: "☀️", rain: 0  },
      { hour: "15.00", temp: 31, icon: "⛅", rain: 10 },
      { hour: "18.00", temp: 28, icon: "🌦️", rain: 25 },
      { hour: "21.00", temp: 26, icon: "🌙", rain: 5  },
    ],
    daily: [
      { condition: "sunny",      high: 32, low: 24, rain: 10, wind: 16 },
      { condition: "sunny",      high: 33, low: 25, rain: 5,  wind: 15 },
      { condition: "partly",     high: 31, low: 24, rain: 20, wind: 14 },
      { condition: "partly",     high: 31, low: 24, rain: 25, wind: 14 },
      { condition: "light_rain", high: 29, low: 23, rain: 55, wind: 18 },
      { condition: "rain",       high: 28, low: 22, rain: 70, wind: 20 },
      { condition: "partly",     high: 30, low: 23, rain: 30, wind: 15 },
      { condition: "sunny",      high: 32, low: 24, rain: 10, wind: 14 },
      { condition: "sunny",      high: 33, low: 25, rain: 5,  wind: 13 },
      { condition: "partly",     high: 31, low: 24, rain: 20, wind: 15 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

  yogyakarta: {
    current: {
      temp: 29, feel: 32, humidity: 79, wind: 10, visibility: 8,
      pressure: 1007, uv: 7, rain: 1.5, sunrise: "05:39", sunset: "17:47",
      aqi: 61, condition: "partly",
    },
    hourly: [
      { hour: "00.00", temp: 24, icon: "🌙", rain: 5  },
      { hour: "03.00", temp: 23, icon: "🌙", rain: 0  },
      { hour: "06.00", temp: 24, icon: "🌅", rain: 5  },
      { hour: "09.00", temp: 27, icon: "⛅", rain: 15 },
      { hour: "12.00", temp: 31, icon: "☀️", rain: 10 },
      { hour: "15.00", temp: 29, icon: "🌦️", rain: 40 },
      { hour: "18.00", temp: 27, icon: "🌧️", rain: 55 },
      { hour: "21.00", temp: 25, icon: "🌙", rain: 15 },
    ],
    daily: [
      { condition: "partly",     high: 31, low: 23, rain: 30, wind: 10 },
      { condition: "cloudy",     high: 30, low: 23, rain: 45, wind: 11 },
      { condition: "light_rain", high: 28, low: 22, rain: 65, wind: 13 },
      { condition: "rain",       high: 27, low: 21, rain: 80, wind: 16 },
      { condition: "light_rain", high: 28, low: 22, rain: 60, wind: 12 },
      { condition: "partly",     high: 30, low: 23, rain: 30, wind: 10 },
      { condition: "sunny",      high: 32, low: 24, rain: 10, wind: 9  },
      { condition: "sunny",      high: 32, low: 24, rain: 5,  wind: 8  },
      { condition: "partly",     high: 31, low: 23, rain: 25, wind: 10 },
      { condition: "cloudy",     high: 29, low: 22, rain: 45, wind: 12 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

  manado: {
    current: {
      temp: 27, feel: 30, humidity: 90, wind: 22, visibility: 8,
      pressure: 1008, uv: 5, rain: 8.0, sunrise: "05:58", sunset: "18:02",
      aqi: 28, condition: "thunderstorm",
    },
    hourly: [
      { hour: "00.00", temp: 24, icon: "⛈️", rain: 60 },
      { hour: "03.00", temp: 23, icon: "🌧️", rain: 70 },
      { hour: "06.00", temp: 23, icon: "🌧️", rain: 65 },
      { hour: "09.00", temp: 25, icon: "🌦️", rain: 45 },
      { hour: "12.00", temp: 28, icon: "⛅", rain: 30 },
      { hour: "15.00", temp: 27, icon: "🌦️", rain: 50 },
      { hour: "18.00", temp: 25, icon: "⛈️", rain: 80 },
      { hour: "21.00", temp: 24, icon: "🌧️", rain: 65 },
    ],
    daily: [
      { condition: "thunderstorm", high: 28, low: 22, rain: 90, wind: 22 },
      { condition: "rain",         high: 27, low: 21, rain: 80, wind: 20 },
      { condition: "light_rain",   high: 28, low: 22, rain: 65, wind: 18 },
      { condition: "cloudy",       high: 29, low: 22, rain: 45, wind: 16 },
      { condition: "partly",       high: 30, low: 23, rain: 30, wind: 15 },
      { condition: "partly",       high: 30, low: 23, rain: 25, wind: 14 },
      { condition: "light_rain",   high: 29, low: 22, rain: 60, wind: 17 },
      { condition: "thunderstorm", high: 27, low: 21, rain: 85, wind: 23 },
      { condition: "rain",         high: 27, low: 21, rain: 75, wind: 20 },
      { condition: "cloudy",       high: 29, low: 22, rain: 45, wind: 17 },
    ],
    moon: { phase: "🌖", name: "Sabit Akhir", illum: 62 },
  },

};
