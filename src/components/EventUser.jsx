import { useEffect, useState } from "react"
import EventCard from "./EventCard"
import { useNavigate } from "react-router-dom"

function EventUser() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const getEvents = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setError("Vous devez être connecté.")
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/event/user`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error("Impossible de récupérer vos événements")
                }

                setEvents(data.eventUser);
            } catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);

            }
        }
        getEvents()
    }, [])

    const updateEvent = (id) => {
        navigate(`/update?id=${id}`)
    }

    if (loading) {
        return <p>Chargement...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div id="eventUser">
            <h2>Mes événements</h2>
            {events.length === 0 ? (
                <p>Vous n'avez créé aucun événement.</p>
            ) : (
                <div id="cards-container"> {events.map((event) => (
                    <EventCard
                        key={event.id_event}
                        id={event.id_event}
                        name={event.name_event}
                        date={new Date(event.date_event).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                        address={event.address_event}
                        description={event.description_event}
                        image_event={event.image_event}
                        showUpdate={true}
                        onUpdatePage={updateEvent}
                    />
                ))}
                </div>)}
        </div>
    )
}

export default EventUser
