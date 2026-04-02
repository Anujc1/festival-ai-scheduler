const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/festival_scheduler');

const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  start_time: DataTypes.DATE,
  end_time: DataTypes.DATE
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('🚀 Backend on http://localhost:3001');
    console.log('✅ Connected to PostgreSQL!');
  });
});
