const express = require('express')
const router = express.Router()
const Trip = require('../model/Trip');

router.post('/', async(req, res) => {
    try{
        const{userSelection, tripData, userEmail, docId} = req.body;

        if(!userSelection || !tripData || !userEmail || !docId){
            return res.status(400).json({message: "Please fill all the fields."});
        }

        const newTrip = new Trip({
            userSelection,
            tripData,
            userEmail,
            docId
        })
        const savedTrip = await newTrip.save()
        res.status(201).json({message: "Trip saved", trip: savedTrip})
    }
    catch(e){
        console.log('Error saving trip to db', e.message)
        res.status(500).send('Server Error, trip not saved')
    }
})

router.get('/:docId', async(req, res) => {
    try{
        const {docId} = req.params;
        const trip = await Trip.findOne({docId})
        if(!trip){
            return res.status(404).json({message: "Trip not found."})
        }
        res.status(200).json(trip)
        //method to convert js object into json of response object
    }catch(e){
        console.log('Error fetching trip from db', e.message)
        res.status(500).send('Server Error, trip not found')
    }
})

router.get('/user/:userEmail', async(req, res) => {
    try{
        const {userEmail} = req.params;
        const userTrips = await Trip.find({userEmail})
        res.status(200).json(userTrips)
    }
    catch(err){
        console.error('error fetching user trips: ', err.message)
        res.status(500).send('Server error: failed to fetch user trips')
    }
})

module.exports = router;