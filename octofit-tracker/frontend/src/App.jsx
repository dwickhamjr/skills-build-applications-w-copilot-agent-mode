import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { apiBaseUrl } from './api'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navigationItems = [
  { path: '/users', label: 'Users' },
  { path: '/teams', label: 'Teams' },
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <img src={octofitLogo} alt="OctoFit Tracker" />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Team fitness dashboard</h1>
          </div>
        </div>
        <p className="api-pill">API {apiBaseUrl}</p>
      </header>

      <nav className="nav nav-pills app-nav">
        {navigationItems.map((item) => (
          <NavLink className="nav-link" key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
