import EventCard from './EventCard'

const EventList = ({
  events,
  loading,
  favorite,
  onAddFavorite,
  onDeleteFavorite,
}) => {
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
      </div>
    )
  }

  if (events.length === 0) {
    return <p id="message">Aucun événement ne correspond à votre recherche.</p>
  }

  return events.map((event) => (
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
      isFavorite={favorite.includes(event.id_event)}
      onAddFavorite={onAddFavorite}
      onDeleteFavorite={onDeleteFavorite}
      image_event={event.image_event}
    />
  ))
}

export default EventList