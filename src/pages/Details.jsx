import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Details() {
    const [searchParams] = useSearchParams()
    const idEvent = searchParams.get('id')

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getEvent = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/event/${idEvent}`
                );

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des événements");
                }

                const data = await response.json();
                setEvent(data.getEventById[0]);

            } catch (error) {
                console.error(error);
                setError(error.message)
            } finally {
                setLoading(false);
            }
        }

        if (idEvent) {
            getEvent()
        }

    }, [idEvent])

    if (loading) {
        return <p>Chargement...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!event) {
        return <p>Événement introuvable</p>
    }

    return (
        <>
            <header>
                <div>
                    <a href="/">Event<span>ly</span></a>
                    <Navbar />
                </div>
            </header>
            <main>
                <section>
                    <div>
                        <h1>{event.name_event}</h1>
                        <p>{event.description_event}</p>
                        <p> Date : {event.date_event} </p>
                        <p> Lieu : {event.address_event} </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Details