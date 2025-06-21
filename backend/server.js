require('dotenv').config(); // Load .env variables at the very top

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const feedbackRoutes = require('./routes/feedback');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use(feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
