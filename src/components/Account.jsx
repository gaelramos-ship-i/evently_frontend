import { useNavigate } from "react-router-dom"

function Account() {
    const navigate = useNavigate()
    return (
        <div id="account">
            <h2>Tu organises un événement ?</h2>
            <button onClick={() => navigate("/register") }>
                Créer un compte
            </button>
        </div>
    )
}

export default Account