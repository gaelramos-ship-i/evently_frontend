import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { HashLink } from "react-router-hash-link";

function Account() {
    const navigate = useNavigate()
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
    return (
        <section id="account">
            <div>
                <h1>Découvre et partage les événements près de chez toi</h1>
                <h2>Tu organises un événement ?</h2>
                <div id="btns">
                    <HashLink smooth to="/#search">
                        <button>Explorer les événements</button>
                    </HashLink>
                    {session === 'guest' && (
                        <button onClick={() => navigate("/register")}>
                            Créer un compte
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Account