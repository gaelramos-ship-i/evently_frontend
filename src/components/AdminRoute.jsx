import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
    const [access, setAccess] = useState('loading')

    useEffect(() => {
        const checkAdmin = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                setAccess('unauthorized')
                return
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/auth/user`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (!response.ok) {
                    setAccess('unauthorized')
                    return
                }

                const user = await response.json()
                setAccess(user.role === 'admin' ? 'admin' : 'forbidden')
            } catch {
                setAccess('error')
            }
        }

        checkAdmin()
    }, [])

    if (access === 'loading') return <p>Vérification des accès…</p>
    if (access === 'unauthorized') return <Navigate to="/login" replace />
    if (access === 'forbidden') return <Navigate to="/" replace />
    if (access === 'error') return <p>Impossible de vérifier les droits d’accès.</p>

    return <Outlet />
}