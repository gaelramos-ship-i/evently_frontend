import { useEffect, useState } from 'react'

function useAdminEvents() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [processingId, setProcessingId] = useState(null)

    useEffect(() => {
        const loadEvents = async () => {
            const token = localStorage.getItem('token')

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/admin/pending`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Impossible de charger les événements.'
                    )
                }

                setEvents(data.events)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadEvents()
    }, [])

    const moderateEvent = async (idEvent, status) => {
        const token = localStorage.getItem('token')
        setProcessingId(idEvent)
        setError('')

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/admin/${idEvent}/status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            )
            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || 'La décision n’a pas pu être enregistrée.'
                )
            }

            setEvents((current) =>
                current.filter((event) => event.id_event !== idEvent)
            )
        } catch (err) {
            setError(err.message)
        } finally {
            setProcessingId(null)
        }
    }

    return {
        events,
        loading,
        error,
        processingId,
        moderateEvent,
    }
}

export default useAdminEvents