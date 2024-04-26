const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


const bookRoutes = require('./routes/book')


mongoose.connect("mongodb://127.0.0.1:27017/book-project")


const app = express();

app.use(express.json())
app.use(cors())

app.use('/book', bookRoutes)

app.get('/', function (req, res) {
    res.send("Hello Khushi")
})

app.listen(7000, () => {
    console.log("server is running at port 7000")
})



// server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const bookRoutes = require('./routes/book');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use('/api/books', bookRoutes);

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/book-project', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log('Connected to MongoDB');
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     })
//     .catch(error => console.error('Error connecting to MongoDB:', error));
