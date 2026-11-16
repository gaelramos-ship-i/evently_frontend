import EventCard from './EventCard'

const FavoriteList = ({ favorites, loading, error, status, onDeleteFavorite }) => {
  if (loading) {
    return (
      <>
        <h2>Mes favoris</h2>
        <p aria-live="polite">Chargement des favoris…</p>
      </>
    )
  }

  return (
    <>
      <h2>Mes favoris</h2>

      {error && <p>{error}</p>}

      {!error && favorites.length === 0 && (
        <p>Vous n'avez aucun favori.</p>
      )}

      {!error && (
        <div id="cards-container">
          {favorites.map((event, index) => (
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
              imagePriority={index === 0}
            />
          ))}
        </div>
      )}

      {status && (
        <p className={status.type === 'ok' ? 'green' : 'red'}>
          {status.message}
        </p>
      )}
    </>
  )
}

export default FavoriteList
