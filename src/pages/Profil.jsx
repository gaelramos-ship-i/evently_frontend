import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

const API_URL = `${import.meta.env.VITE_BASE_URL}/fav/get`

export default function Profil() {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
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
                <section>
                    <h1>Mes favoris</h1>

                    {loading && <p>Chargement des favoris...</p>}
                    {error && <p>{error}</p>}

                    {!loading && !error && favorites.length === 0 && (
                        <p>Vous n'avez aucun favori.</p>
                    )}

                    <div id="cards">
                        {favorites.map((event) => (
                            <article key={event.id_event}>
                                <h2>{event.name_event}</h2>
                                <p>Type : {event.type_event}</p>
                                <p>Adresse : {event.address_event}</p>
                                <p>Date : {event.date_event}</p>
                                <p>Prix : {event.price_event} €</p>
                                <p>{event.description_event}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}