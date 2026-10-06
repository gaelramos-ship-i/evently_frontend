import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import '../styles/profil.scss'

export default function Profil() {
    const token = localStorage.getItem('token')

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState([])

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [status, setStatus] = useState(null)
    const [description, setDesc] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')

    const handleFile = (e) => {
        const f = e.target.files[0]
        if (!f) return
        setFile(f)
        setPreview(URL.createObjectURL(f))
        setStatus(null)
    }

    const handleUpload = async () => {
        const API_URL = `${import.meta.env.VITE_BASE_URL}/event/add`
        if (!file || !name.trim()) return
        setLoading(true)
        setStatus(null)

        const formData = new FormData()
        formData.append('title', name.trim())
        formData.append('image', file) // doit correspondre à upload.single('image')

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            const data = await res.json()

            if (res.status === 401)
                throw new Error('Non autorisé : token manquant ou invalide')

            if (!res.ok)
                throw new Error(data.message || 'Erreur serveur')

            setStatus({
                type: 'ok',
                message: 'Upload réussi : ' + JSON.stringify(data)
            })

        } catch (err) {
            setStatus({ type: 'error', message: err.message })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const API_URL = `${import.meta.env.VITE_BASE_URL}/fav/get`
        const getFav = async () => {

            setLoading(true)
            setError(null)

            const token = localStorage.getItem('token')

            try {
                const res = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || 'Erreur serveur')
                }

                setFavorites(data)

            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        getFav()
    }, [])


    return (
        <>
            <header>
                <div>
                    <a href="/">Event<span>ly</span></a>
                    <Navbar />
                </div>
            </header>
            <main>
                <section id='favoris'>
                    <div>
                        <h1>Mes favoris</h1>

                        {loading && <p>Chargement des favoris...</p>}
                        {error && <p>{error}</p>}

                        {!loading && !error && favorites.length === 0 && (
                            <p>Vous n'avez aucun favori.</p>
                        )}

                        <div id='cards-container'>
                            {favorites.map((event) => (
                                <EventCard
                                    key={event.id_event}
                                    id={event.id_event}
                                    name={event.name_event}
                                    date={event.date_event}
                                    address={event.address_event}
                                    description={event.description_event}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                <section id='addEvent'>
                    <div>
                        <div>
                            <h2>Ajoute un événement ici !</h2>
                            <input
                                className='file'
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleFile}
                            />

                            {preview && <img src={preview} alt="Aperçu" className='preview' />}

                            <input
                                className='form'
                                type="text"
                                placeholder="Titre *"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={100}
                                required
                            />
                            <input
                                className='form'
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <input
                                className='form'
                                type="text"
                                placeholder='Adresse'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input
                                className='form'
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <button
                                className='submit-button'
                                onClick={() => handleUpload()}
                                disabled={!file || !name.trim() || loading}
                            >
                                {loading ? 'Envoi...' : 'Publier'}
                            </button>

                            {status && (
                                <p className={status.type === 'ok' ? 'green' : 'red'}>
                                    {status.message}
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}