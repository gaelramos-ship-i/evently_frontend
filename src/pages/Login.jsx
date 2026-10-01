import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/login.scss'

const API_URL = `${import.meta.env.VITE_BASE_URL}/auth/login`

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const from = location.state?.from?.pathname || '/'

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || 'Erreur serveur')

            localStorage.setItem('token', data.token)
            navigate(from, { replace: true })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <header>
        <div>
          <a href="/">Event<span>ly</span></a>
          <Navbar />
        </div>
      </header>
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Connexion</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    {/* <p>
                        6 caractères min, avec majuscule, minuscule, chiffre et symbole.
                    </p> */}
                </div>

                {error && <p>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                </button>

                <p>
                    Pas encore inscrit ?{' '}
                    <Link to="/register">
                        S'inscrire
                    </Link>
                </p>
            </form>
        </div>
        <Footer />
        </>
    )
}