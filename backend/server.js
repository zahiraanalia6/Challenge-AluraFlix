const express = require('express');
const bodyParser = require('body-parser');
const moviesRouter = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/movies', moviesRouter);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
