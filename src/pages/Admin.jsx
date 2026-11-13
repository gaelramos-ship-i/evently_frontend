import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import getImageUrl from '../utils/getImageUrl'
import '../styles/admin.scss'

export default function Admin() {
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
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Impossible de charger les événements.')
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
                throw new Error(data.message || 'La décision n’a pas pu être enregistrée.')
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

    return (
        <>
            <header>
                <div>
                    <a href="/">Event<span>ly</span></a>
                    <Navbar />
                </div>
            </header>

            <main id="admin-page">
                <section>
                    <h1>Modération des événements</h1>
                    <p>Examine les événements soumis avant leur publication.</p>

                    {error && <p role="alert" className="admin-error">{error}</p>}
                    {loading && <p>Chargement des événements…</p>}

                    {!loading && !error && events.length === 0 && (
                        <p>Aucun événement en attente de validation.</p>
                    )}

                    <div className="admin-events">
                        {events.map((event) => (
                            <article className="admin-event" key={event.id_event}>
                                {event.image_event && (
                                    <img
                                        src={getImageUrl(event.image_event)}
                                        alt={event.name_event}
                                    />
                                )}

                                <div className="admin-event__content">
                                    <h2>{event.name_event}</h2>
                                    <p><strong>Type :</strong> {event.type_event}</p>
                                    <p><strong>Date :</strong> {new Date(event.date_event).toLocaleDateString('fr-FR')}</p>
                                    <p><strong>Adresse :</strong> {event.address_event}</p>
                                    <p>{event.description_event}</p>

                                    <div className="admin-event__actions">
                                        <button
                                            type="button"
                                            disabled={processingId === event.id_event}
                                            onClick={() => moderateEvent(event.id_event, 'approved')}
                                        >
                                            Accepter
                                        </button>
                                        <button
                                            type="button"
                                            disabled={processingId === event.id_event}
                                            onClick={() => moderateEvent(event.id_event, 'rejected')}
                                        >
                                            Refuser
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}