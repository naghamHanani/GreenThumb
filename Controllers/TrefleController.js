const TrefleService = require('../Services/TrefletService');

class TrefleController {

  static async searchPlantByQuery(req, res) {
    try {
      const query = req.params.q;
      const plants = await TrefleService.searchPlants(query);
      res.json(plants);
    } catch (error) {
      res.status(500).send('An error occurred while fetching data from the Trefle API');
    }
  }

  static async getPlantById(req, res) {
    try {
      const plantId = req.params.id;
      const plant = await TrefleService.getPlantById(plantId);
      res.json(plant);
    } catch (error) {
      res.status(500).send('An error occurred while fetching plant by ID from the Trefle API');
    }
  }

  



}

module.exports = TrefleController;