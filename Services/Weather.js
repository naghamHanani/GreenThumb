const axios = require('axios');

const API_KEY = '257d874e67f7413590b163420241406'; 
const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

class WeatherService {
    static async getWeather(city) {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    key: API_KEY,
                    q: city
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }
    static async getExtendedForecast(city) {
        try {
            const response = await axios.get(`${BASE_URL}/forecast`, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching extended forecast data:', error);
            throw error;
        }
    }

    static async getHistoricalWeather(city, date) {
        try {
            const response = await axios.get(`${BASE_URL}/timemachine`, {
                params: {
                    q: city,
                    dt: date,
                    appid: API_KEY,
                    units: 'metric'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching historical weather data:', error);
            throw error;
        }
    }

    static async getAirQuality(city) {
        try {
            const response = await axios.get(`${BASE_URL}/air_pollution`, {
                params: {
                    q: city,
                    appid: API_KEY
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching air quality data:', error);
            throw error;
        }
    }

    static async getWeatherAlerts(city) {
        try {
            const response = await axios.get(`${BASE_URL}/alerts`, {
                params: {
                    q: city,
                    appid: API_KEY
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching weather alerts:', error);
            throw error;
        }
    }

    static async getUVIndex(city) {
        try {
            const response = await axios.get(`${BASE_URL}/uvi`, {
                params: {
                    q: city,
                    appid: API_KEY
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching UV index data:', error);
            throw error;
        }
    }
}

module.exports = WeatherService;
