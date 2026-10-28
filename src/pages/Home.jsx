import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Account from '../components/account'
import '../styles/home.scss'
import { useEffect, useState } from "react";
import EventCard from '../components/EventCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)
  const [favorite, setFavorite] = useState([]);
  const [status, setStatus] = useState(null)
  const [category, setCategory] = useState('Tous')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      search.length < 3 ||
      event.name_event?.toLowerCase().includes(search.toLowerCase()) ||
      event.description_event?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "Tous" ||
      event.type_event === category;

    return matchesSearch && matchesCategory;
  });

  // Permet d'ajouter un événement aux favoris
  const addFavorite = async (idUser, eventId) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/fav/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_event: eventId,
          id_user: idUser,
        }),

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur serveur')
      }
      setFavorite((prev) => [...prev, eventId]);
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  // Permet de supprimer le favori 
  const deleteFavorite = async (eventId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/fav/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur serveur')
      }

      // On retire la card de la liste
      setFavorite((prevFavorites) =>
        prevFavorites.filter(
          (favorite) => favorite !== eventId
        )
      );

    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  };

  // Permet d'afficher les événements disponibles
  useEffect(() => {
    const getEvents = async () => {
      setLoading(true)
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
        setStatus({
          type: 'error',
          message: error.message
        });
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
        <Account />
        <section id='search'>
          <div id="search-container">
            <h2>Explorer les événements !</h2>
            <input
              type="text"
              placeholder="Recherche un événement..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div id="filter">
              {["Tous", "Concert", "Festival", "Cinéma", "Exposition", "Sport"].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={category === cat ? "active" : ""}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {status && (
            <p 
            id="status-message"
            className={status.type === 'ok' ? 'green' : 'red'}>
              {status.message}
            </p>
          )}

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
                  isFavorite={favorite.includes(event.id_event)}
                  onAddFavorite={addFavorite}
                  onDeleteFavorite={deleteFavorite}
                  image_event={event.image_event}
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