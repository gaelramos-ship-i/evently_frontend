import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Account from '../components/account'
import '../styles/home.scss'
import { useEffect, useState } from "react";
import EventCard from '../components/EventCard';

const Home = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)

  const filteredEvents =
    search.length >= 3
      ? events.filter((event) =>
        event.name_event?.toLowerCase().includes(search.toLowerCase())
      )
      : events;

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/event`
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des événements");
        }
        const data = await response.json();
        setEvents(data.getEvent);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getEvents()
  }, [])

  return (
    <>
      <header>
        <div>
          <a href="/">Event<span>ly</span></a>
          <Navbar />
        </div>
      </header>
      <main>
        <section id='search'>
          <Account />
          <div id="search-container">
            <input
              type="text"
              placeholder="Recherche un événement..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div id="project-list">
            {loading ? (
              <p>Chargement des événements...</p>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id_event}
                  id={event.id_event}
                  name={event.name_event}
                  date={new Date(event.date_event).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  address={event.address_event}
                  description={event.description_event}
                />
              ))
            ) : (
              <p id='message'>Aucun événement ne correspond à votre recherche.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home