// models/CompanyUser.js
const mongoose = require('mongoose');

const companyUserSchema = new mongoose.Schema({
  companyUser: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  email: { type: String, required: false },
  mobileNumber: { type: String, required: true },
  dob: { type: Date, required: false },
  address: { type: String, required: false }
});

module.exports = mongoose.model('CompanyUser', companyUserSchema);
