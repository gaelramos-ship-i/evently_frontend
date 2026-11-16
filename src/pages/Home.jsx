import { useState } from "react";
import { preload } from "react-dom";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Account from '../components/Account'
import useEvents from '../hooks/UseEvents';
import useFilteredEvents from '../hooks/useFilteredEvents'
import useFavorites from '../hooks/useFavorites'
import EventFilters from "../components/EventFilters"
import EventList from '../components/EventList'
import '../styles/home.scss'

const Home = () => {
  preload('/img/concert_random.webp', { as: 'image', fetchPriority: 'high' })

  const [search, setSearch] = useState("");
  const { events, loading, status: eventsStatus } = useEvents();
  const [category, setCategory] = useState('Tous')
  const navigate = useNavigate()
  const {
    favorite,
    addFavorite,
    deleteFavorite,
    status: favoriteStatus,
  } = useFavorites(navigate)
  const displayedStatus = favoriteStatus || eventsStatus
  const filteredEvents = useFilteredEvents(events, search, category)

  const [visibleCount, setVisibleCount] = useState(6)
  const visibleEvents = filteredEvents.slice(0, visibleCount)
  const hasMoreEvents = visibleCount < filteredEvents.length


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
          <EventFilters
            search={search}
            onSearchChange={(value) => {
              setSearch(value)
              setVisibleCount(6)
            }}
            category={category}
            onCategoryChange={(value) => {
              setCategory(value)
              setVisibleCount(6)
            }}
          />

          {displayedStatus && (
            <p
              id="status-message"
              className={displayedStatus.type === 'ok' ? 'green' : 'red'}
            >
              {displayedStatus.message}
            </p>
          )}

          <div id="project-list">
            <EventList
              events={visibleEvents}
              loading={loading}
              favorite={favorite}
              onAddFavorite={addFavorite}
              onDeleteFavorite={deleteFavorite}
            />
          </div>
          {hasMoreEvents && (
            <button
              className="show-more-button"
              type="button"
              onClick={() => setVisibleCount((count) => count + 6)}
            >
              Voir plus
            </button>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
