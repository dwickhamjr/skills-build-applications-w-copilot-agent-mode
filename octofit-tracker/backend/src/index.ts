import express from 'express';
import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ apiUrl: baseUrl, status: 'ok' });
});

app.get('/api/users/', async (_req, res, next) => {
  try {
    const users = await UserModel.find().sort({ name: 1 }).lean();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().sort({ points: -1 }).lean();
    res.json({ teams });
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().sort({ activityDate: -1 }).lean();
    res.json({ activities });
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
    res.json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ title: 1 }).lean();
    res.json({ workouts });
  } catch (error) {
    next(error);
  }
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Startup failure:', error);
    process.exit(1);
  }
}

startServer();
