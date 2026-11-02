import { useState } from "react"
import EventCard from "./EventCard"
import { useNavigate } from "react-router-dom"
import ModalConfirm from "./ModalConfirm"

function EventUser({ events, setEvents, loading, error }) {

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

        const token = localStorage.getItem("token")

        if (!token) {
            setDeleteError("Vous devez être connecté.")
            setEventToDelete(null)
            return
        }

        setDeleting(true)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/event/${eventToDelete}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
        return <p>Chargement...</p>
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
                        showDelEvent={true}
                        showFavorite={false}
                        onUpdatePage={updateEvent}
                        onDeleteEvent={askDeleteEvent}
                    />
                ))}
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
