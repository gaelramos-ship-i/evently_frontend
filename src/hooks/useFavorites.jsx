import { useState } from 'react'

const useFavorites = (navigate) => {
    const [favorite, setFavorite] = useState([])
    const [status, setStatus] = useState(null)

    const addFavorite = async (idUser, eventId) => {
        try {
            const currentToken = localStorage.getItem('token')

            if (!currentToken) {
                navigate('/login')
                return
            }

            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/fav/${eventId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentToken}`,
                    },
                    body: JSON.stringify({
                        id_event: eventId,
                        id_user: idUser,
                    }),
                }
            )

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
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/login')
                return
            }
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/fav/${eventId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

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