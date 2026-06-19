import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchCollection('leaderboard')
      .then((records) => {
        if (active) {
          setLeaderboard(records)
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
    return <p className="status-text">Loading leaderboard...</p>
  }

  if (error) {
    return <p className="status-text text-danger">{error}</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <article className="leaderboard-row" key={entry._id || entry.rank}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.username}</h2>
              <p>{entry.team}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard
