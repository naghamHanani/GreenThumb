const WeatherService = require('../Services/Weather');

async function getWeather(req, res) {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ message: 'City parameter is required' });
    }

    try {
        const weatherData = await WeatherService.getWeather(city);
        res.status(200).json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching weather data', error });
    }
}

module.exports = {
    getWeather: getWeather
};
