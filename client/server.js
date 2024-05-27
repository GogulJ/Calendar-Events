const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');

let events = [];
app.use(express.json());
app.use(cors());
app.get('/events', (req, res) => {
  res.send({events});
});
app.get('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const event = events.find(event => event.id === eventId);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  res.json(event);
});

app.post('/events', (req, res) => {
  const { description, date } = req.body;
  const newEvent = { id: Date.now().toString(), description, date };
  events.push(newEvent);
  res.json(newEvent);
});

app.put('/update/:id', (req, res) => {
  const eventId = req.params.id;
  const { title, description, date } = req.body;
  console.log(date)
  console.log(eventId)
  const eventIndex = events.findIndex(event => event.id === eventId);
  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }
  events[eventIndex] = { ...events[eventIndex], title, description, date };
  res.json(events[eventIndex]);
});

app.delete('/delete/:id', (req, res) => {
  const eventId = req.params.id;
  events = events.filter(event => event.id !== eventId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});