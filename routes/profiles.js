import express from 'express';
import mongoose from 'mongoose';
import Profile from '../models/profile.js'
import fetch from 'node-fetch'

//Initializing Router
const router = express.Router()

//Initializing Node-Fetch

//GET Calls
router.get('/', async (req, res) => { //Gets all profiles
    console.log('GET all profiles called.')
    try {
        const allProfiles = await Profile.find()
        res.json(allProfiles)
        console.log('GET succeeded.')
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`GET failed with ${error}`)
    }
})

router.get('/:id', getProfile, (req, res) => { //Get profile by ID
    console.log('GET profile by ID called.')
    try {
        res.send(res.profile)
        console.log('GET succeeded.')
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`GET failed with ${error}`)
    }
})



//POST Calls
router.post('/new', async (req, res) => { //Posts a new profile
    console.log('POST a new profile called.')
    const profile = new Profile ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        interests: req.body.interests,
        locLatitude: req.body.locLatitude,
        locLongitude: req.body.locLongitude,
        //city: req.body.brand.city,
        //state: req.body.state,
        //currentTemp: req.body.currentTemp,
    })

    //Attempting to send the profile object to the DB
    try {
        const newProfile = await profile.save()
        res.status(201).json(newProfile)
        console.log('POST succeeded.')
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(`POST failed with ${error}`)
    }
})

//PATCH Calls
router.patch('/update/:id', getProfile, async (req, res) => { //Update one profile by ID
    console.log('PATCH a profile called.')
    let requeryWeatherAPI = false;

    //Determining which fields need to be updated
    if (req.body.firstName != null) {
        res.profile.firstName = req.body.firstName
    }

    if (req.body.lastName != null) {
        res.profile.lastName = req.body.lastName
    }

    if (req.body.interests != null) {
        res.profile.interests = req.body.interests
    }

    if (req.body.locLatitude != null) {
        res.profile.locLatitude = req.body.locLatitude
        requeryWeatherAPI = true;
    }

    if (req.body.locLongitude != null) {
        res.profile.locLongitude = req.body.locLongitude
        requeryWeatherAPI = true;
    }

    //Determing if the weather API needs to be called again
    if (requeryWeatherAPI === true) {
        //TODO Requery weather API since one of the co-ordinates was modified
    }

    //Attempting to update a profile with new information
    try {
        const updatedProfile = await res.profile.save()
        res.json(updatedProfile)
        console.log('PATCH succeeded.')
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log('PATCH failed.')
    }
})

//DELETE Calls
router.delete('/delete/:id', getProfile, async (req, res) => {
    console.log('DELETE a profile by ID called.')
    try {
        await res.profile.remove()
        res.json({ message: `Deleted Profile with ID: ${res.profile.id}` })
        console.log('DELETE succeeded.')
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('DELETE failed.')
    }
})

//Function for getting Profile by ID
async function getProfile(req, res, next) {
    let profile

    try {
        //If given valid Mongo ObjectID...
        if (mongoose.isValidObjectId(req.params.id)) {
            profile = await Profile.findById(req.params.id)
            
            //If profile doesn't exist
            if (profile == null) {
                return res.status(404).json ({ message: 'Cant find a profile by the request ID!'})
            }
        } else {
            return res.status(404).json ({ message: 'Invalid MongoDB ObjectID given' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    //Setting response to profile
    res.profile = profile
    next()
}

//Function for getting data from the weather API
async function getWeatherDetails (req, res, next) {
    let city
    let state
    let currentTemp
}

export default router