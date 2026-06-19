import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchCollection('workouts')
      .then((records) => {
        if (active) {
          setWorkouts(records)
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
    return <p className="status-text">Loading workouts...</p>
  }

  if (error) {
    return <p className="status-text text-danger">{error}</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-lg-4" key={workout._id || workout.title}>
            <article className="workout-card">
              <p className="badge text-bg-dark">{workout.category}</p>
              <h2>{workout.title}</h2>
              <p>{workout.difficulty} - {workout.durationMinutes} min</p>
              <ul>
                {workout.exercises?.map((exercise) => (
                  <li key={exercise}>{exercise}</li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
