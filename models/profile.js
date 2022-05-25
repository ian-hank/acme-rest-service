import mongoose from 'mongoose';
const { Schema } = mongoose

//Schema and fields for an ACME Profile
const profileSchema = new Schema({

    //Provided by front-end
    personaID: {
        type: String,
        required: false
    },

    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    interests: {
        type: [String],
        required: true
    },

    locLatitude: {
        type: mongoose.Types.Decimal128,
        required: true
    },

    locLongitude: {
        type: mongoose.Types.Decimal128,
        required: true
    },

    //Retrieved information from api.weather.gov
    city: {
        type: String,
        required: false
    },

    state: {
        type: String,
        required: false
    },

    currentTemp: {
        //TODO Determine type weather api uses for temperature
    }
})

//Exporting Modules (ES6)
export default mongoose.model('Profile', profileSchema)