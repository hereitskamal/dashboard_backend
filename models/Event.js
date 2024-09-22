const mongoose = require('mongoose');

// Define the schema for the Event model
const eventSchema = new mongoose.Schema({
    eventType: { 
        type: [String], 
        required: true 
    },
    inclusions: { 
        type: [String], 
        required: true 
    },
    allowed: { 
        type: [String], 
        required: true 
    },
    notAllowed: { 
        type: [String], 
        required: true 
    },
    petFriendly: { 
        type: Boolean, 
        default: false 
    },
    coupleFriendly: { 
        type: Boolean, 
        default: false 
    },
    indoor: { 
        type: Boolean, 
        default: false 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        default: null 
    },
    price: { 
        type: Number, 
        required: true 
    },
    numberOfDays: { 
        type: Number, 
        default: 1 
    },
    description: { 
        type: String, 
        required: true 
    },
    itinerary: { 
        type: [String], 
        default: [''] 
    },
    address: { 
        type: String, 
        required: true 
    },
    nearby: { 
        type: String, 
        default: '' 
    },
    city: { 
        type: String, 
        required: true 
    },
    state: { 
        type: String, 
        required: true 
    },
    country: { 
        type: String, 
        required: true 
    },
    googleMapLink: { 
        type: String, 
        default: '' 
    },
    companyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company', 
        required: true 
    }
}, {
    timestamps: true
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
