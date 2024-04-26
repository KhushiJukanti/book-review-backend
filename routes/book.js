const express = require('express');
const router = express.Router();
const BookModel = require('../models/book');
const mongoose = require('mongoose');

// for all  books
router.get('/all', async function (req, res) {
    let books = await BookModel.find({})
    res.send(books)
})

//  for single book

router.get('/:id', async function (req, res) {
    const id = req.params.id
    let book = await BookModel.findById(id)
    res.send(book)
})


router.post('/create', async function (req, res) {
    const { BookTitle, BookAuthor, BookDesc, BookCover } = req.body;
    const newBook = new BookModel({
        BookTitle,
        BookAuthor,
        BookDesc,
        BookCover
    });

    // Save the new book document to the database
    const BookData = await newBook.save();
    res.send(BookData)
})


// router.post('/reviews', async function (req, res) {
//     const { BookId, user, rating, comment } = req.body;
//     const newReview = new BookModel.review({BookId, user, rating, comment });

//     const Reviews = await newReview.save()
//     res.send(Reviews);
// })



router.post('/reviews', async function (req, res) {
    const { _id, user, rating, comment } = req.body; // Assuming you're passing bookId along with user, rating, and comment
    try {
        const book = await BookModel.findById(_id);
        if (!book) {

            return res.status(404).json({ error: 'Book not found' });
        }

        // Assuming BookModel has a subdocument or array field called 'reviews'
        book.Bookreviews.push({ user, rating, comment });
        await book.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});


router.get('/reviews/:id', async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        // Send the book's reviews as response
        res.json(book.Bookreviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});


router.delete('/:id', async function (req, res) {
    const id = req.params.id
    const deleteData = await BookModel.findByIdAndDelete(id);
    res.send("data deleted Successfully")
})


module.exports = router;
