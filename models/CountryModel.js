const mongoose = require('mongoose');

const countriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required']
    },
    region: {
        type: String,
        required: [true, 'region required']
    },
}, 
{
    timestamps: true
})

const CountryModel = new mongoose.model('country', countriesSchema)

module.exports = CountryModel