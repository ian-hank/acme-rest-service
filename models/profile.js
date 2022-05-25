import mongoose from 'mongoose';
const { Schema } = mongoose
const { SchemaTypes } = mongoose

//Schema and fields for an ACME Profile
const profileSchema = new Schema({

    //Provided by front-end
    personaID: {
        type: String
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
        tpye: [String],
        required: true
    },

    locLatitude: {
        type: SchemaTypes.Double,
        required: true
    },

    locLongitude: {
        type: SchemaTypes.Double,
        required: true
    },

    //Retrieved information from api.weather.gov
    city: {
        type: String
    },

    state: {
        type: String
    },

    currentTemp: {
        //TODO Determine type weather api uses for temperature
    }
})

//Exporting Modules (ES6)
export default mongoose.model('Profile', profileSchema)