const axios = require('axios');

const TREFLE_API_TOKEN= '6Ojovh-JfkMfP2J5PVP88IHlalsxw5wllBESS72M1vY'

class TrefleService {
  constructor() {
    this.apiToken = TREFLE_API_TOKEN;
    this.baseUrl = 'https://trefle.io/api/v1';
  }

  async searchPlants(query) {
    const url = `${this.baseUrl}/plants/search`;
    try {
      const response = await axios.get(url, {
        params: { q: query, token: this.apiToken },
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false
        })
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Trefle API:', error);
      throw error;
    }
  }

  async getPlantById(id) {
    const url = `${this.baseUrl}/plants/${id}`;
    try {
      const response = await axios.get(url, {
        params: { token: this.apiToken },
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false
        })
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching plant by ID from Trefle API:', error);
      throw error;
    }
  }

  
}

module.exports = new TrefleService();