import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Startup failure:', error);
    process.exit(1);
  }
}

startServer();
