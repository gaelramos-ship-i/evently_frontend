import { HashLink } from 'react-router-hash-link'

const Footer = () => {
    return (
        <footer>
            <div>
                <a href="/">Event<span>ly</span></a>
                <p>© Copyright {new Date().getFullYear()} - Evently</p>
                <div id="documentsLegaux">
                    <HashLink to="/mentions-legales"
                        onClick={() => window.scrollTo(0, 0)}>
                        Mentions légales
                    </HashLink>
                    <HashLink to="/mentions-legales#cgu">
                        CGU
                    </HashLink>
                    <HashLink to="/mentions-legales#confidentialite">
                        Politique de confidentialité
                    </HashLink>
                    <a
                        href="#gerer-cookies"
                        onClick={(e) => {
                            e.preventDefault()
                            window.dispatchEvent(new Event('evently:open-cookie-settings'))
                        }}
                    >
                        Gérer les cookies
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer