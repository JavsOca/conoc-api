const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    tipo: {type: String, required: true },
    imagePath: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
