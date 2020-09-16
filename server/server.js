const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/keys');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err));

// Use routes
app.use('/api/users', require('./routes/users'));

// Use port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
