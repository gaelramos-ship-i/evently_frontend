import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className='navbar'>
        <Link to="/">Accueil</Link>
        <Link to="/profile">Mon espace</Link>
    </nav>
);

export default Navbar;