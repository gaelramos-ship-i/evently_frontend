import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/register.scss'

const API_URL = `${import.meta.env.VITE_BASE_URL}/auth/register`

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [accepted, setAccepted] = useState()

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
      navigate('/')
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
      <div className='register-page'>
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Inscription</h1>

          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={form.name}
            onChange={handleChange}
            required
          />

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
            <p>6 caractères min, avec majuscule, minuscule, chiffre et symbole.</p>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="cgu-checkbox">
            <p> Vos données personnelles sont utilisées pour créer et gérer votre compte et assurer le
              fonctionnement d’Evently. Pour en savoir plus sur les données collectées, leur utilisation, vos
              droits, consultez notre Politique de confidentialité.</p>
              <div>
              <input
                type="checkbox"
                id="cgu"
                name="cgu"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                required
              />

              <label htmlFor="cgu">
                J'ai lu et j'accepte les{' '}
                <Link to="/cgu" target="_blank">
                  Conditions générales d'utilisation
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Création...' : "S'inscrire"}
          </button>

          <p className="login-link">
            Déjà un compte ?{' '}
            <Link to="/login">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  )
}