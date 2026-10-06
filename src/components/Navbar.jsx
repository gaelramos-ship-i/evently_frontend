import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
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