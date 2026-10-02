import { useNavigate } from "react-router-dom"

function Account() {
    const navigate = useNavigate()
    return (
        <div id="account">
            <h1>Découvrez et partagez les événements près de chez vous</h1>
            <h2>Tu organises un événement ?</h2>
            <button onClick={() => navigate("/register") }>
                Créer un compte
            </button>
        </div>
    )
}

export default Account