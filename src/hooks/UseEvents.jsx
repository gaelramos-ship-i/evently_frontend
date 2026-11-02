import { useEffect, useState } from 'react'

const useEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let timeoutId

    const getEvents = async () => {
      setLoading(true)
      const startTime = Date.now()

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/event`
        )

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des événements')
        }

        const data = await response.json()
        setEvents(data.getEvent)
      } catch (error) {
        setStatus({ type: 'error', message: error.message })
      } finally {
        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(0, 1500 - elapsedTime)

        timeoutId = setTimeout(() => setLoading(false), remainingTime)
      }
    }

    getEvents()

    return () => clearTimeout(timeoutId)
  }, [])

  return { events, loading, status }
}

export default useEvents