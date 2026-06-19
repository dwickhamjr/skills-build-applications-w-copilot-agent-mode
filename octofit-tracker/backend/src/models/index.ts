import { Schema, model } from 'mongoose';

export interface User {
  username: string;
  name: string;
  email: string;
  age: number;
  favoriteActivity: string;
  joinedAt: Date;
}

export interface Team {
  name: string;
  motto: string;
  members: string[];
  points: number;
}

export interface Activity {
  username: string;
  type: string;
  durationMinutes: number;
  calories: number;
  activityDate: Date;
}

export interface LeaderboardEntry {
  username: string;
  team: string;
  points: number;
  rank: number;
}

export interface Workout {
  title: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    favoriteActivity: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    members: [{ type: String, required: true }],
    points: { type: Number, required: true },
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    username: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    username: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true, unique: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
export const TeamModel = model<Team>('Team', teamSchema);
export const ActivityModel = model<Activity>('Activity', activitySchema);
export const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
export const WorkoutModel = model<Workout>('Workout', workoutSchema);
