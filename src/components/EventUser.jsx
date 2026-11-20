import { useState } from "react"
import EventCard from "./EventCard"
import { useNavigate } from "react-router-dom"
import ModalConfirm from "./ModalConfirm"

function EventUser({ events, setEvents, loading, error }) {

    const [visibleCount, setVisibleCount] = useState(3)
    const visibleEvents = events.slice(0, visibleCount)

    const [eventToDelete, setEventToDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)

    const [deleteError, setDeleteError] = useState(null)
    const navigate = useNavigate()


    const updateEvent = (id) => {
        navigate(`/update?id=${id}`)
    }

    const askDeleteEvent = (id) => {
        setEventToDelete(id)
    }

    const deleteEvent = async () => {
        if (eventToDelete === null || deleting) return

        setDeleting(true)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/event/${eventToDelete}`,
                {
                    method: "DELETE",
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error("Impossible de supprimer cet événement.")
            }

            setEvents((prevEvents) =>
                prevEvents.filter(
                    (event) => event.id_event !== eventToDelete
                )
            )

            setEventToDelete(null)

        } catch (err) {
            setDeleteError(err.message)
        } finally {
            setDeleting(false)
        }
    }

    if (loading) {
        return (
            <div id="eventUser">
                <h2>Mes événements</h2>
                <div id="cards-container" className="skeleton-grid" aria-hidden="true">
                    {[1, 2, 3].map((item) => (
                        <div className="skeleton-card" key={item} />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div id="eventUser">
            <h2>Mes événements</h2>
            {deleteError && <p>{deleteError}</p>}
            {events.length === 0 ? (
                <p>Vous n'avez créé aucun événement.</p>
            ) : (
                <div id="cards-container">
                    {visibleEvents.map((event, index) => (
                        <div key={event.id_event}>
                            <EventCard
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
                                imagePriority={index === 0}
                                showUpdate={true}
                                showDelEvent={true}
                                showFavorite={false}
                                onUpdatePage={updateEvent}
                                onDeleteEvent={askDeleteEvent}
                            />
                        </div>
                    ))}
                    {visibleCount < events.length && (
                        <button
                            className="show-more-button"
                            type="button"
                            onClick={() => setVisibleCount((count) => count + 3)}
                        >
                            Voir plus
                        </button>
                    )}
                    <ModalConfirm
                        isOpen={eventToDelete !== null}
                        eventName={
                            events.find(
                                (event) => event.id_event === eventToDelete
                            )?.name_event || ""
                        }
                        onCancel={() => setEventToDelete(null)}
                        onConfirm={deleteEvent}
                        loading={deleting}
                    />
                </div>)}
        </div>
    )
}

export default EventUser
