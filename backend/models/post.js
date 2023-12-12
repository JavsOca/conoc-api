const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
    author: { type: String, required: true },
    contact: { type: String, required: true },
    imagePath: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);
