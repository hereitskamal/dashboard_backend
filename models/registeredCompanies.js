const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  admin: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  employeeRange: {
    type: String,
    required: true,
  },
  address: {
    city: { type: String },
    state: { type: String },
    country: { type: String },
    mapLink: { type: String }
  },
  contactNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Company', CompanySchema);
