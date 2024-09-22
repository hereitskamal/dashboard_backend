const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'modules' });

module.exports = mongoose.model('Module', ModuleSchema);
