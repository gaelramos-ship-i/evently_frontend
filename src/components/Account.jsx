import { useNavigate } from "react-router-dom"
import { HashLink } from "react-router-hash-link";

function Account() {
    const navigate = useNavigate()
    return (
        <div id="account">
            <div>
                <h1>Découvre et partage les événements près de chez toi</h1>
                <h2>Tu organises un événement ?</h2>
                <div id="btns">
                    <HashLink smooth to="/#search">
                        <button>Explorer les événements</button>
                    </HashLink>
                    <button onClick={() => navigate("/register")}>
                        Créer un compte
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Account