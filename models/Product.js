const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    manufacturer: { type: String },
    brand: { type: String },
    dimensions: {
        height: { type: String },
        length: { type: String },
        width: { type: String },
        weight: { type: String }
    },
    materials: [String],
    color: [String],
    image: { type: String },
    specifications: { type: String },
    features: { type: String },
    instructions: { type: String },
    warranty: { type: String },
    compliance: { type: String },
    targetAudience: { type: String },
    availability: { type: String },
    reviews: { type: String },
    shipping: { type: String },
    returnPolicy: { type: String },
    legalInfo: { type: String },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }
});

module.exports = mongoose.model('Product', productSchema);
