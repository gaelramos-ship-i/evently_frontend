import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import '../styles/editProfil.scss'

function EditProfil() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingProfil, setLoadingProfil] = useState(true);

    useEffect(() => {
        const fetchProfil = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Tu dois être connecté.");
                }

                const response = await fetch(
                    "http://localhost:3000/api/v1/auth/user",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Impossible de récupérer le profil."
                    );
                }

                setName(data.name || "");
                setEmail(data.email || "");
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoadingProfil(false);
            }
        };

        fetchProfil();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        setMessage("")
        setLoading(true)

        try {
            const token = localStorage.getItem("token")

            const response = await fetch("http://localhost:3000/api/v1/auth/update-profil", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            });

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de la modification.")
            }

            setMessage(data.message)
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
            <main className="edit-profil">
                <section id="updateEvent">
                    <div>
                        <a href="/profil">&lt; Retour</a>
                        {loadingProfil ? (
                            <p>Chargement du profil...</p>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <h1>Modifier mon profil</h1>
                                    <label htmlFor="nom">Nom</label>
                                    <input
                                        type="text"
                                        id="nom"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Adresse e-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" disabled={loading}>
                                    {loading ? "Enregistrement..." : "Enregistrer"}
                                </button>

                                {message && <p role="status">{message}</p>}
                            </form>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default EditProfil