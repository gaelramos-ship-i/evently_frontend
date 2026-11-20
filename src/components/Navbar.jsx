import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/auth/logout`,
            {
                method: 'POST',
                credentials: 'include',
            }
        )

        if (!response.ok) {
            throw new Error('La déconnexion a échoué.')
        }

        navigate('/login')
    } catch (error) {
        window.alert(error.message)
    }
}
    return (
        <nav className="navbar">
            <Link to="/">Accueil</Link>
            <Link to="/profil">Mon espace</Link>

            {location.pathname === "/profil" && (
                <button onClick={handleLogout}>
                    Déconnexion
                </button>
            )}
        </nav>
    );
}; export default Navbar;