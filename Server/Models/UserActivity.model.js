const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  fullname: {
    firstname: String,
    lastname: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isRecruiter: {
    type: Boolean,
  },
  companyName: {
    type: String

  },
  email: String,
  route: String,
  method: String,
  location:Object,
  browser:String,
  browserVersion:String,
  os:String,
  osVersion:String,
  deviceType:String,
  deviceVendor:String,
  deviceModel:String,
  cpuArch:String,
  ip: String,
  platform: String,
  timestamp: { type: Date, default: Date.now }
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);
module.exports = UserActivity;