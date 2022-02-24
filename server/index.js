const express = require('express');
const cors = require('cors');

// Create routes to authenticate the user on the client-side application.
const authRoutes = require("./routes/auth.js");

// Create an instance of express
const app = express();
const PORT = process.env.PORT || 8000; // get the PORT from environment variable or 5000

require('dotenv').config(); // get all the environment variables.

// setup up all the middlewares!
app.use(cors()); // will allow us to make croos-origin resource sharing requests.
app.use(express.json());// allows us to transfer JSON packets from front-end to the back-end
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Hello, World');
});

app.use('/auth', authRoutes); // Adds the Routes to the whole server. | what to show when the web address contains '/auth'

// run the server on a specific port and listen to it.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

