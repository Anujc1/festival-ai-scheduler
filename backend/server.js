const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

// FIXED (CLOUD):
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  }
});

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
    console.log('🚀 https://festival-ai-scheduler-production.up.railway.app"');
    console.log('✅ Connected to PostgreSQL!');
  });
});
