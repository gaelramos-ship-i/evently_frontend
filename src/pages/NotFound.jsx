import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound">
      <h1>404</h1>
      <h2>Oups ! Cette page n'existe pas.</h2>

      <Link to="/" className="home-btn">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound