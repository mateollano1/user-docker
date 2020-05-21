const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    lastName: { type: String },
    phone: { type: String },
    city: { type: String },
    mail: { type: String },

});

module.exports = mongoose.model("User", userSchema);