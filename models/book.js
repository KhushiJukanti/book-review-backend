// const mongoose = require("mongoose")
// const BookSchema = new mongoose.Schema({
//     id: Number,
//     BookTitle: String,
//     BookAuthor: String,
//     BookDec: String,
//     assigned: {
//         type: Boolean,
//         require: true,
//         default: 'false'
//     }
// })

// module.exports = mongoose.model("book", BookSchema)


// models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    BookTitle: {
        type: String,
        required: true
    },
    BookAuthor: {
        type: String,
        required: true
    },
    BookDesc: {
        type: String,
        required: true
    },
    BookCover: {
        type: String,
        required: true
    },
    Bookreviews: [{
        user: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Book', BookSchema);
