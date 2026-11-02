import { useState } from "react";
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
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
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
              events={filteredEvents}
              loading={loading}
              favorite={favorite}
              onAddFavorite={addFavorite}
              onDeleteFavorite={deleteFavorite}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home