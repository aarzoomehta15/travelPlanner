const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userSelection:{
        location: {
            type: Object,
            required: true
        }, 
        noOfDays: {
            type: Number,
            required: true
        },
        budget: {
            type: String,
            required: true
        },
        travellers: {
            type: String,
            required: true
        }
    },

    tripData: {
        type: String,
        required: true
    },

    userEmail:{
        type: String,
        required: true
    },

    docId: {
        type: String,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;