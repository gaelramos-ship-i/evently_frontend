
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/mentionsLegales.scss'
import { HashLink } from 'react-router-hash-link'

export default function MentionsLegales() {
    return (
        <>
            <header>
                <div>
                    <a href="/">
                        Event<span>ly</span>
                    </a>
                    <Navbar />
                </div>
            </header>

            <main className="legal-page">
                <section className="legal-container">
                    <h1>Mentions légales</h1>
                    <p className="legal-intro">
                        Retrouvez les informations légales et les
                        conditions d'utilisation du site Evently.
                    </p>

                    <section className="legal-section">
                        <h2>1. Propriétaire du site</h2>

                        <p><strong>Nom et prénom :</strong> Gaël Ramos</p>
                        <p>
                            <strong>Adresse postale :</strong>{' '}
                            54 rue de la Belle Vue, Route du Val, Brignoles
                        </p>
                        <p>
                            <strong>Adresse e-mail :</strong>{' '}
                            <a href="mailto:ramosgael108@gmail.com">
                                ramosgael108@gmail.com
                            </a>
                        </p>
                        <p>
                            <strong>Téléphone :</strong> 07 66 27 10 20
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Hébergement du site</h2>

                        <p>
                            <strong>Directeur de la publication :</strong>{' '}
                            Gaël Ramos
                        </p>
                        <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                        <p>
                            340 S Lemon Ave #4133<br />
                            Walnut, CA 91789<br />
                            États-Unis
                        </p>
                        <p>
                            <strong>Site web :</strong>{' '}
                            <a
                                href="https://vercel.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                https://vercel.com/
                            </a>
                        </p>
                    </section>

                    <section className="legal-section" id='confidentialite'>
                        <h2>3. Collecte des données personnelles</h2>

                        <h3>Finalité</h3>
                        <p>
                            Evently collecte certaines données personnelles,
                            notamment le nom et l'adresse e-mail des
                            utilisateurs, afin de permettre la création et
                            la gestion de leur compte et d'assurer le suivi
                            des événements proposés.
                        </p>

                        <h3>Données collectées</h3>
                        <ul>
                            <li>Nom et prénom ;</li>
                            <li>Adresse e-mail ;</li>
                            <li>Informations relatives aux événements proposés.</li>
                        </ul>

                        <h3>Utilisation des données</h3>
                        <p>
                            Les données sont utilisées pour assurer le
                            fonctionnement du site et fournir les
                            fonctionnalités proposées aux utilisateurs.
                            Elles ne sont pas utilisées à des fins commerciales,
                            conformément aux pratiques annoncées par le site.
                        </p>

                        <h3>Durée de conservation</h3>
                        <p>
                            Les données sont conservées pendant la durée
                            nécessaire à la gestion du compte et à la
                            fourniture du service. En cas de suppression
                            du compte, les données sont supprimées sous
                            réserve des obligations légales de conservation.
                        </p>

                        <h3>Droits des utilisateurs</h3>
                        <p>
                            Conformément au RGPD, les utilisateurs disposent,
                            selon les conditions prévues par la réglementation,
                            d'un droit d'accès, de rectification, d'effacement,
                            de limitation du traitement, d'opposition et,
                            lorsque cela est applicable, de portabilité.
                        </p>
                        <p>
                            Pour exercer leurs droits, les utilisateurs
                            peuvent contacter le responsable du site à
                            l'adresse suivante :
                            {' '}
                            <a href="mailto:ramosgael108@gmail.com">
                                ramosgael108@gmail.com
                            </a>.
                        </p>
                        <p>
                            Ils peuvent également adresser une réclamation
                            à la Commission nationale de l'informatique
                            et des libertés (CNIL).
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>
                            4. Conditions générales d'utilisation (CGU)
                        </h2>

                        <h3>Article 1 — Objet</h3>
                        <p>
                            Les présentes Conditions générales d'utilisation
                            définissent les règles d'utilisation du site
                            Evently. La plateforme permet notamment de créer
                            un compte, de consulter des événements et de
                            proposer ou partager des événements avec
                            les autres utilisateurs. L'utilisation du site
                            implique l'acceptation des présentes CGU.
                        </p>

                        <h3>Article 2 — Accès au site</h3>
                        <p>
                            L'utilisateur est responsable de son matériel,
                            de sa connexion Internet et des éventuels frais
                            associés. Le propriétaire d'Evently peut modifier
                            ou interrompre temporairement certaines
                            fonctionnalités pour des raisons de maintenance,
                            de sécurité ou de mise à jour.
                        </p>

                        <h3>Article 3 — Création du compte</h3>
                        <p>
                            Certaines fonctionnalités nécessitent la création
                            d'un compte. L'utilisateur est responsable de
                            la confidentialité de ses identifiants et de
                            l'utilisation de son compte. En cas d'utilisation
                            frauduleuse ou non autorisée, il doit contacter
                            le responsable du site par e-mail.
                        </p>

                        <h3>Article 4 — Publication et partage des événements</h3>
                        <p>
                            Les utilisateurs peuvent, lorsque cette
                            fonctionnalité est disponible, créer et partager
                            des événements. Ils s'engagent à fournir des
                            informations aussi exactes, claires et à jour
                            que possible concernant la description, la date,
                            le lieu et les conditions de participation.
                            Ils doivent disposer des droits et autorisations
                            nécessaires pour organiser ou publier leurs événements.
                        </p>

                        <h3>Article 5 — Légalité des événements</h3>
                        <p>
                            Les utilisateurs s'engagent à publier uniquement
                            des événements conformes aux lois et règlements
                            en vigueur. Ils sont responsables des événements
                            qu'ils publient et des autorisations nécessaires
                            à leur organisation ou diffusion.
                        </p>
                        <p>
                            Il est interdit de publier un événement dont
                            l'organisation ou la diffusion est manifestement
                            contraire à la loi. Les utilisateurs doivent
                            notamment respecter les règles relatives à la
                            sécurité, à l'ordre public, à la propriété
                            intellectuelle et à la protection des personnes.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Informations lors de l'inscription</h2>

                        <p>
                            Le formulaire d'inscription à Evently comprend
                            les champs suivants :
                        </p>

                        <ul>
                            <li>Nom et prénom ;</li>
                            <li>Adresse e-mail ;</li>
                            <li>Mot de passe ;</li>
                            <li>
                                Case à cocher : « J'ai lu et j'accepte les
                                Conditions générales d'utilisation. »
                            </li>
                        </ul>

                        <div className="legal-notice">
                            Vos données personnelles sont utilisées pour
                            créer et gérer votre compte et assurer le
                            fonctionnement d'Evently. Pour en savoir plus
                            sur les données collectées, leur utilisation,
                            leur durée de conservation et vos droits,
                            consultez notre{' '}
                            {/* <a href="/politique-confidentialite">
                                politique de confidentialité
                            </a>. */}
                            <HashLink smooth to="#confidentialite">
                                <button>politique de confidentialité</button>
                            </HashLink>
                        </div>
                    </section>
                </section>
            </main>

            <Footer />
        </>
    )
}
