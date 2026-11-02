import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import FavoriteList from '../components/FavoriteList'
import '../styles/profil.scss'
import EventUser from '../components/EventUser'
import GetProfil from '../components/GetProfil'
// import FormEvent from '../components/FormEvent'

export default function Profil() {
    const token = localStorage.getItem('token')

    const [events, setEvents] = useState([])
    const [eventsLoading, setEventsLoading] = useState(true)
    const [eventsError, setEventsError] = useState(null)

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState([])

    const [status, setStatus] = useState('')

    useEffect(() => {
        const getEvents = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                setEventsError('Vous devez être connecté.')
                setEventsLoading(false)
                return
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/event/user`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error('Impossible de récupérer vos événements')
                }

                setEvents(data.eventUser)
            } catch (error) {
                setEventsError(error.message)
            } finally {
                setEventsLoading(false)
            }
        }

        getEvents()
    }, [])

    // Permet de supprimer les favoris sur la page profil
    const deleteFavorite = async (eventId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/fav/${eventId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Impossible de supprimer le favori");
            }

            setFavorites((prevFavorites) =>
                prevFavorites.filter(
                    (favorite) => favorite.id_event !== eventId
                )
            );

        } catch (err) {
            setStatus({ type: 'error', message: err.message })
        }
    };

    // Permet d'afficher les favoris 
    useEffect(() => {
        const API_URL = `${import.meta.env.VITE_BASE_URL}/fav/get`
        const getFav = async () => {

            setLoading(true)
            setError(null)

            const token = localStorage.getItem('token')

            try {
                const res = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || 'Erreur serveur')
                }

                setFavorites(data)

            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        getFav()
    }, [])


    return (
        <>
            <header>
                <div>
                    <a href="/">Event<span>ly</span></a>
                    <Navbar />
                </div>
            </header>
            <main>
                <GetProfil events={events} favorites={favorites} />
                <section id="favoris">
                    <div>
                        <FavoriteList
                            favorites={favorites}
                            loading={loading}
                            error={error}
                            status={status}
                            onDeleteFavorite={deleteFavorite}
                        />

                        <EventUser
                            events={events}
                            setEvents={setEvents}
                            loading={eventsLoading}
                            error={eventsError}
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}