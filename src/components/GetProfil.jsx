import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/getProfil.scss'

function GetProfil() {
    const [user, setUser] = useState([])
    const [events, setEvents] = useState([])
    const [favorites, setFavorites] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('token')

                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/auth/user`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                )

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des événements");
                }
                const data = await response.json()
                setUser(data)

                const [eventsResponse, favoritesResponse] = await Promise.all([
                    fetch(`${import.meta.env.VITE_BASE_URL}/event/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }),
                    fetch(`${import.meta.env.VITE_BASE_URL}/fav/get`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                ])

                if (!eventsResponse.ok || !favoritesResponse.ok) {
                    throw new Error("Erreur lors de la récupération des événements ou favoris")
                }

                const eventsData = await eventsResponse.json()
                const favoritesData = await favoritesResponse.json()

                setEvents(eventsData.eventUser)
                setFavorites(favoritesData)

            } catch (err) {
                console.error(err)
            }
        }
        getUser()
    }, [])

    return (
        <section id="profil">
            <div>
                <div>
                    <h1>Bonjour, {user.name} !</h1>
                    <p>Partager des événements, retrouver vos favoris et organiser vos prochaines sorties !</p>
                </div>
                <div id="params">
                    <div id="stats">
                        <article>
                            <p>{events.length}</p>
                            <h3>Evenements créés</h3>
                        </article>
                        <article>
                            <p>{favorites.length}</p>
                            <h3>Favoris enregistrés</h3>
                        </article>
                    </div>
                    <div>
                        <button>Modifier le profil</button>
                        <button onClick={() => navigate("/create")}>
                            Créer un événement
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GetProfil