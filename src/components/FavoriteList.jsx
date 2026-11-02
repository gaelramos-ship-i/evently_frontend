import EventCard from './EventCard'

const FavoriteList = ({ favorites, loading, error, status, onDeleteFavorite }) => (
  <>
    <h2>Mes favoris</h2>

    {loading && <p>Chargement des favoris...</p>}
    {error && <p>{error}</p>}

    {!loading && !error && favorites.length === 0 && (
      <p>Vous n'avez aucun favori.</p>
    )}

    <div id="cards-container">
      {favorites.map((event) => (
        <EventCard
          key={event.id_event}
          id={event.id_event}
          name={event.name_event}
          date={new Date(event.date_event).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
          address={event.address_event}
          description={event.description_event}
          showDelete
          onDeleteFavorite={onDeleteFavorite}
          showUpdate={false}
          image_event={event.image_event}
        />
      ))}
    </div>

    {status && (
      <p className={status.type === 'ok' ? 'green' : 'red'}>
        {status.message}
      </p>
    )}
  </>
)

export default FavoriteList