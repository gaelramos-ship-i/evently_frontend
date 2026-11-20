import { useState } from 'react'

const useFavorites = (navigate) => {
    const [favorite, setFavorite] = useState([])
    const [status, setStatus] = useState(null)

    const addFavorite = async (idUser, eventId) => {
        try {

            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/fav/${eventId}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_event: eventId,
                        id_user: idUser,
                    }),
                }
            )

            if (response.status === 401) {
                navigate('/login')
                return
            }

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Erreur serveur')
            }

            setFavorite((previous) => [...previous, eventId])
        } catch (error) {
            setStatus({ type: 'error', message: error.message })
        }
    }

    const deleteFavorite = async (eventId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/fav/${eventId}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (response.status === 401) {
                navigate('/login')
                return
            }

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Erreur serveur')
            }

            setFavorite((previous) =>
                previous.filter((favoriteId) => favoriteId !== eventId)
            )
        } catch (error) {
            setStatus({ type: 'error', message: error.message })
        }
    }

    return { favorite, addFavorite, deleteFavorite, status }
}

export default useFavorites