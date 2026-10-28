import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <div>
                <a href="/">Event<span>ly</span></a>
                <div id="documentsLegaux">
                    <p>
                        <Link to="/mentions-legales">
                            Mentions légales |
                            CGU et politique de confidentialité
                        </Link>
                    </p>
                </div>
                <p>© Copyright {new Date().getFullYear()} - Evently</p>
            </div>
        </footer>
    )
}

export default Footer