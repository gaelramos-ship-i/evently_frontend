import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import FormEvent from '../components/FormEvent'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'react-router-dom'

function EditEvent() {
    const [searchParams] = useSearchParams()
    const idEvent = searchParams.get('id')

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchEvent = async () => {
            const token = localStorage.getItem('token')

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/event/${idEvent}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(
                        data.message || "Impossible de récupérer l'événement."
                    )
                }
                setEvent(data.getEventById?.[0])
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [idEvent])

    return (
        <>
            <header>
                <div>
                    <a href="/">Event<span>ly</span></a>
                    <Navbar />
                </div>
            </header>

            <main>
                {loading && <p>Chargement de l'événement...</p>}

                {error && <p className="red">{error}</p>}

                {event && (
                    <FormEvent
                        key={event.id_event}
                        eventToEdit={event}
                    />
                )}
            </main>

            <Footer />
        </>
    )
}

export default EditEvent