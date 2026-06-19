import { connectDatabase, disconnectDatabase } from '../config/database';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models';

const users = [
  {
    username: 'maya_moves',
    name: 'Maya Thompson',
    email: 'maya.thompson@example.com',
    age: 29,
    favoriteActivity: 'Trail running',
    joinedAt: new Date('2026-01-08'),
  },
  {
    username: 'corey_climbs',
    name: 'Corey Singh',
    email: 'corey.singh@example.com',
    age: 34,
    favoriteActivity: 'Bouldering',
    joinedAt: new Date('2026-02-14'),
  },
  {
    username: 'lena_lifts',
    name: 'Lena Rodriguez',
    email: 'lena.rodriguez@example.com',
    age: 27,
    favoriteActivity: 'Strength training',
    joinedAt: new Date('2026-03-02'),
  },
];

const teams = [
  {
    name: 'Cardio Crew',
    motto: 'Every mile counts.',
    members: ['maya_moves', 'corey_climbs'],
    points: 2480,
  },
  {
    name: 'Rep Rangers',
    motto: 'Strong form, stronger team.',
    members: ['lena_lifts'],
    points: 2210,
  },
];

const activities = [
  {
    username: 'maya_moves',
    type: 'Run',
    durationMinutes: 42,
    calories: 410,
    activityDate: new Date('2026-06-15T07:30:00Z'),
  },
  {
    username: 'corey_climbs',
    type: 'Climb',
    durationMinutes: 75,
    calories: 520,
    activityDate: new Date('2026-06-16T18:15:00Z'),
  },
  {
    username: 'lena_lifts',
    type: 'Strength',
    durationMinutes: 55,
    calories: 360,
    activityDate: new Date('2026-06-17T12:00:00Z'),
  },
];

const leaderboard = [
  {
    username: 'maya_moves',
    team: 'Cardio Crew',
    points: 1320,
    rank: 1,
  },
  {
    username: 'lena_lifts',
    team: 'Rep Rangers',
    points: 1185,
    rank: 2,
  },
  {
    username: 'corey_climbs',
    team: 'Cardio Crew',
    points: 1160,
    rank: 3,
  },
];

const workouts = [
  {
    title: 'Morning Momentum',
    category: 'Cardio',
    difficulty: 'Intermediate',
    durationMinutes: 35,
    exercises: ['Dynamic warmup', 'Tempo run', 'Hill strides', 'Cooldown walk'],
  },
  {
    title: 'Foundational Strength',
    category: 'Strength',
    difficulty: 'Beginner',
    durationMinutes: 45,
    exercises: ['Goblet squat', 'Push-up', 'Romanian deadlift', 'Plank hold'],
  },
  {
    title: 'Climber Core Circuit',
    category: 'Mobility',
    difficulty: 'Advanced',
    durationMinutes: 30,
    exercises: ['Dead hang', 'Hollow hold', 'Side plank', 'Hip mobility flow'],
  },
];

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  await Promise.all([
    UserModel.insertMany(users),
    TeamModel.insertMany(teams),
    ActivityModel.insertMany(activities),
    LeaderboardModel.insertMany(leaderboard),
    WorkoutModel.insertMany(workouts),
  ]);

  console.log(`Seeded ${users.length} users`);
  console.log(`Seeded ${teams.length} teams`);
  console.log(`Seeded ${activities.length} activities`);
  console.log(`Seeded ${leaderboard.length} leaderboard entries`);
  console.log(`Seeded ${workouts.length} workouts`);
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
