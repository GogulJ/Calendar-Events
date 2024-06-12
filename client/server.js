const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // Adjust port as needed
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

// Define Schema for Events
const eventSchema = new mongoose.Schema({
  id: String,
  description: String,
  date: Date
});

// Create Event model
const Event = mongoose.model('Event', eventSchema);

app.use(express.json());
app.use(cors());

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/events', async (req, res) => {
  const { description, date } = req.body;
  const newEvent = new Event({ description, date });
  try {
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/events/:id', async (req, res) => {
  const { description, date } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { description, date }, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(404).json({ message: 'Event not found' });
  }
});

app.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: 'Event not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
