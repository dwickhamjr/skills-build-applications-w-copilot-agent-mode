import { useEffect, useState } from 'react'
import { extractCollection } from '../api'

const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetch(teamsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed for teams: ${response.status}`)
        }

        return response.json()
      })
      .then((payload) => extractCollection(payload, 'teams'))
      .then((records) => {
        if (active) {
          setTeams(records)
          setError('')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <p className="status-text">Loading teams...</p>
  }

  if (error) {
    return <p className="status-text text-danger">{error}</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Squads</p>
        <h1>Teams</h1>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.name}>
            <article className="team-card">
              <div>
                <h2>{team.name}</h2>
                <p>{team.motto}</p>
              </div>
              <p className="metric">{team.points} pts</p>
              <p className="members">{team.members?.join(', ') || 'No members yet'}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
