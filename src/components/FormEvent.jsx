import { useState } from "react"

function FormEvent() {
    const token = localStorage.getItem('token')

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [description, setDesc] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('')

    const handleFile = (e) => {
        const f = e.target.files[0]
        if (!f) return
        setFile(f)
        setPreview(URL.createObjectURL(f))
        setStatus(null)
    }

    const handleUpload = async () => {
        const API_URL = `${import.meta.env.VITE_BASE_URL}/event/add`
        if (!file ||
            !name.trim() ||
            !description.trim() ||
            !address.trim() ||
            !date ||
            !type
        ) {
            setStatus({
                type: 'error',
                message: 'Veuillez remplir tous les champs obligatoires.'
            })
            return
        }

        setLoading(true)
        setStatus(null)

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name.trim(),
                    date,
                    description: description.trim(),
                    address,
                    type
                }),
            })

            const data = await res.json()

            if (res.status === 401)
                throw new Error('Non autorisé : token manquant ou invalide')

            if (!res.ok)
                throw new Error(data.message || 'Erreur serveur')

            const idEvent = data.idEvent
            if (!idEvent) {
                throw new Error("L'ID de l'événement n'a pas été retourné par le serveur")
            }

            const formData = new FormData()

            formData.append('image', file)

            const imageRes = await fetch(`${import.meta.env.VITE_BASE_URL}/event/${idEvent}/image`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}`, },
                body: formData,
            })

            const imageData = await imageRes.json()

            if (imageRes.status === 401) {
                throw new Error('Non autorisé : token manquant ou invalide')
            }

            if (!imageRes.ok) {
                throw new Error(imageData.message || "Erreur lors de l'upload de l'image")
            }

            setStatus({
                type: 'ok',
                message: 'Événement publié avec succès !'
            })

            // Reset du formulaire 
            setFile(null)
            setPreview(null)
            setName('')
            setDesc('')
            setAddress('')
            setDate('')
            setType('')

        } catch (err) {
            setStatus({ type: 'error', message: err.message })
        } finally {
            setLoading(false)
        }
    }

    return (
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
                    <select
                        className="form"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option value="">Choisir un type</option>
                        <option value="Concert">Concert</option>
                        <option value="Festival">Festival</option>
                        <option value="Exposition">Exposition</option>
                        <option value="Cinéma">Cinéma</option>
                        <option value="Conférence">Conférence</option>
                        <option value="Gaming">Gaming</option>
                    </select>
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
    )
}

export default FormEvent