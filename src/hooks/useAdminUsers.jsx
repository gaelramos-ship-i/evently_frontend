import { useEffect, useState } from 'react'

function useAdminUsers() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [processingUserId, setProcessingUserId] = useState(null)

    useEffect(() => {
        const loadUsers = async () => {
            const token = localStorage.getItem('token')

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/admin/users`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Impossible de charger les utilisateurs.'
                    )
                }

                setUsers(data.users)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadUsers()
    }, [])

    const updateRole = async (user, role) => {
        const token = localStorage.getItem('token')
        setProcessingUserId(user.id_user)
        setError('')

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/admin/users/${user.id_user}/role`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ role }),
                }
            )
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Impossible de modifier le rôle.')
            }

            setUsers((current) =>
                current.map((item) =>
                    item.id_user === user.id_user ? data.user : item
                )
            )
        } catch (err) {
            setError(err.message)
        } finally {
            setProcessingUserId(null)
        }
    }

    const deleteUser = async (user) => {
        const token = localStorage.getItem('token')
        setProcessingUserId(user.id_user)
        setError('')

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/admin/users/${user.id_user}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || 'Impossible de supprimer cet utilisateur.'
                )
            }

            setUsers((current) =>
                current.filter((item) => item.id_user !== user.id_user)
            )

            return true
        } catch (err) {
            setError(err.message)
            return false
        } finally {
            setProcessingUserId(null)
        }
    }

    return {
        users,
        loading,
        error,
        processingUserId,
        updateRole,
        deleteUser,
    }
}

export default useAdminUsers