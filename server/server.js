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
app.use('/api/workouts', require('./routes/workouts'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/likes', require('./routes/likes'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/notifications', require('./routes/notifications'));

//To show the image in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// for deployment
// server static assets if in production mode
if (process.env.NODE_ENV === 'production') {
  // set static folder
  // all js and css files will be read from build folder
  app.use(express.static('client/build'));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Use port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
