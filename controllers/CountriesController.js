const CountryModel = require("../models/CountryModel");

class CountriesController {
  getConutriesList = async (req, res) => {
    const { region } = req.query;

    const query = { region: { $regex: new RegExp(region, "i") } };
    try {
      const response = await CountryModel.find(query).select(["-_id"]);
      const count = await CountryModel.countDocuments(query);
      if (!response || response.length === 0)
        return res
          .status(200)
          .json({ message: "No country found in this region." });

      res.status(200).json({
        status: 200,
        message: `Countries for current region are fetched successfully.`,
        totalCountries: count,
        data: response,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  };

  getSalesRepList = async (req, res) => {
    let minCountriesForRep = 3;
    let maxCountriesForRep = 7;
    try {
      const response = await CountryModel.aggregate([
        {
          $group: {
            _id: "$region",
            countryCount: { $sum: 1 },
          },
        },
      ]);

      if (!response || response.length === 0)
        return res
          .status(200)
          .json({ message: "No country found in this region." });

      const result = response.map((resp) => {
        const countryCount = resp.countryCount;
        const region = resp._id;
        const remCountries = (Math.ceil(countryCount/3) * 3) - countryCount
        const maxSales = (remCountries < 3 && remCountries > 0) ? Math.ceil(countryCount/3) - 1 : Math.ceil(countryCount/3)
        return {
          region,
          minSalesReq: Math.ceil(countryCount/7),
          maxSalesReq: maxSales,
        };
      });

      console.log("result ", result);

      // Step 3: Return the response
      res.status(200).json({

        data: result,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  };
}

const Countries = new CountriesController();

module.exports = Countries;
