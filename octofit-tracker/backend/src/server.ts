import express from 'express';
import { connectDatabase } from './config/database';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models';

export const app = express();
export const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:5173',
    codespaceName ? `https://${codespaceName}-5173.app.github.dev` : undefined,
  ].filter(Boolean);

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

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

export async function startServer() {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Startup failure:', error);
    process.exit(1);
  }
}
