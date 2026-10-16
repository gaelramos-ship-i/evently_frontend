import { useNavigate } from "react-router-dom"

function Account() {
    const navigate = useNavigate()
    return (
        <div id="account">
            <div>
                <h1>Découvre et partage les événements près de chez toi</h1>
                <h2>Tu organises un événement ?</h2>
                <button onClick={() => navigate("/register")}>
                    Créer un compte
                </button>
            </div>
        </div>
    )
}

export default Account