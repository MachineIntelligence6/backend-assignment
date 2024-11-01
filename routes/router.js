const express = require('express')
const Countries = require('../controllers/CountriesController')
const router = express.Router()

router.get("/countries", Countries.getConutriesList)
router.get("/salesrep", Countries.getSalesRepList)

module.exports = router