import { useEffect, useState } from 'react'
import '../styles/cookieConsent.scss'

const GA_ID = 'G-09WQQ7SHVK'
const CHOICE_KEY = 'evently_cookie_choice'
const CONSENT_DURATION_MONTHS = 6

function readStoredConsent() {
    const rawConsent = localStorage.getItem(CHOICE_KEY)

    if (!rawConsent) return null

    try {
        return JSON.parse(rawConsent)
    } catch {
        // Les anciens choix sans date sont redemandés.
        return null
    }
}

function isConsentValid(consent) {
    if (!consent || !['accepted', 'rejected'].includes(consent.choice) || !consent.savedAt) {
        return false
    }

    const expiresAt = new Date(consent.savedAt)
    if (Number.isNaN(expiresAt.getTime())) return false

    expiresAt.setMonth(expiresAt.getMonth() + CONSENT_DURATION_MONTHS)
    return Date.now() < expiresAt.getTime()
}

function loadAnalytics() {
    if (window.eventlyAnalyticsLoaded) return

    window.eventlyAnalyticsLoaded = true
    window[`ga-disable-${GA_ID}`] = false
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
        window.dataLayer.push(arguments)
    }

    window.gtag('js', new Date())
    window.gtag('config', GA_ID)

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)
}

export default function CookieConsent() {
    const [storedConsent, setStoredConsent] = useState(readStoredConsent)
    const consentIsValid = isConsentValid(storedConsent)
    const [choice, setChoice] = useState(() =>
        consentIsValid ? storedConsent.choice : null
    )
    const [isOpen, setIsOpen] = useState(() => !consentIsValid)

    useEffect(() => {
        const openSettings = () => setIsOpen(true)

        window.addEventListener('evently:open-cookie-settings', openSettings)
        return () => {
            window.removeEventListener('evently:open-cookie-settings', openSettings)
        }
    }, [])

    useEffect(() => {
        if (!consentIsValid && localStorage.getItem(CHOICE_KEY)) {
            localStorage.removeItem(CHOICE_KEY)
        }

        if (choice === 'accepted') loadAnalytics()
    }, [choice, consentIsValid])

    const saveChoice = (nextChoice) => {
        const consent = {
            choice: nextChoice,
            savedAt: new Date().toISOString(),
        }

        localStorage.setItem(CHOICE_KEY, JSON.stringify(consent))
        setStoredConsent(consent)
        setChoice(nextChoice)
        setIsOpen(false)

        if (nextChoice === 'rejected') {
            window[`ga-disable-${GA_ID}`] = true

            if (choice === 'accepted') {
                window.location.reload()
            }
        }
    }

    return (
        <>
            {isOpen && (
                <section className="privacy-dialog" role="dialog" aria-label="Choix des cookies">
                    <p>
                        Evently utilise Google Analytics pour mesurer sa fréquentation.
                        Vous pouvez accepter ou refuser ces cookies.
                    </p>
                    <button type="button" onClick={() => saveChoice('rejected')}>Tout refuser</button>
                    <button type="button" onClick={() => saveChoice('accepted')}>Tout accepter</button>
                </section>
            )}

        </>
    )
}
