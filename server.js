import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

//Constants
const PORT_NUMBER = 5000                            //Port # for express server 
const MONGOOSE_URL = process.env.MONGOOSE_URL     //URL for localhost connection
const DATABASE_NAME = process.env.DATABASE_NAME     //Name of the mongo database

//Initialize Express App
const app = express()

//Initialize MongoDB (mongoose)
mongoose.connect(MONGOOSE_URL + DATABASE_NAME, {useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//Starting Express Server
app.use(express.json())
app.listen(PORT_NUMBER, () => console.log(`Express server started on port ${PORT_NUMBER}`))

//Providing server status
app.get('/', (req, res) => { //
    try {
        res.status(200).json({ status: 'OK' })
    } catch (error) {
        res.status(500).json({ status: 'Server Down'})
    }
})