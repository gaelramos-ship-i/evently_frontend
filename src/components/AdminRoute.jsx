import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
    const [access, setAccess] = useState('loading')

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/auth/user`,
                    {
                        credentials: 'include'
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