import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function PrivateRoutes() {
  const location = useLocation()
  const [session, setSession] = useState('checking')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/auth/user`, {
      credentials: 'include',
    })
      .then((response) => {
        setSession(response.ok ? 'authenticated' : 'guest')
      })
      .catch(() => {
        setSession('guest')
      })
  }, [])

  if (session === 'checking') {
    return <p>Vérification de la session…</p>
  }

  if (session === 'guest')
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  return <Outlet />
}