import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/resetPassword.scss'

export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const token = new URLSearchParams(window.location.search).get('token')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')

        if (!token) {
            setMessage('Le lien de réinitialisation est invalide.')
            return
        }

        if (password !== confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas.')
            return
        }

        if (password.length < 8) {
            setMessage('Le mot de passe doit contenir au moins 8 caractères.')
            return
        }

        setLoading(true)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/auth/reset-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, password }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Impossible de réinitialiser le mot de passe.')
            }

            setMessage('Mot de passe modifié avec succès !')
            setPassword('')
            setConfirmPassword('')
        } catch (error) {
            setMessage(error.message)
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
                <section id='resetPassword'>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h1>Réinitialiser mon mot de passe</h1>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    placeholder='Nouveau mot de passe'
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password"
                                    placeholder='Confirmer le mot de passe'
                                    required
                                />
                            </div>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Modification...' : 'Modifier le mot de passe'}
                            </button>
                            {message && <p role="status">{message}</p>}
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
