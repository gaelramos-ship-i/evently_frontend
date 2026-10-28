import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/forgotPassword.scss'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setLoading(true)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/auth/forgot-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || "Une erreur est survenue."
                )
            }

            setMessage(
                data.message ||
                'Si un compte correspond à cette adresse, tu recevras un email.'
            )
        } catch (error) {
            setMessage(error.message || 'Erreur de connexion au serveur.')
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
            <main>
                <section id="forgot-password">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h1>Mot de passe oublié ?</h1>
                            <p>
                                Saisis ton adresse email pour recevoir un lien
                                de réinitialisation.
                            </p>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Adresse email"
                                autoComplete="email"
                                required
                            />

                            <button type="submit" disabled={loading}>
                                {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
                            </button>
                            {message && <p role="status">{message}</p>}
                            <Link to="/login">Retour à la connexion</Link>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
