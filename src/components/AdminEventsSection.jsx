import getImageUrl from '../utils/getImageUrl'

export default function AdminEventsSection({
    events,
    loading,
    error,
    processingId,
    onModerate,
}) {
    return (
        <section>
            <h1>Modération des événements</h1>
            <p>Examine les événements soumis avant leur publication.</p>

            {error && <p role="alert" className="admin-error">{error}</p>}
            {loading && <p>Chargement des événements…</p>}

            {!loading && !error && events.length === 0 && (
                <p>Aucun événement en attente de validation.</p>
            )}

            <div className="admin-events">
                {events.map((event) => (
                    <article className="admin-event" key={event.id_event}>
                        {event.image_event && (
                            <img
                                src={getImageUrl(event.image_event)}
                                alt={event.name_event}
                            />
                        )}

                        <div className="admin-event__content">
                            <h2>{event.name_event}</h2>
                            <p><strong>Type :</strong> {event.type_event}</p>
                            <p>
                                <strong>Date :</strong>{' '}
                                {new Date(event.date_event).toLocaleDateString('fr-FR')}
                            </p>
                            <p><strong>Adresse :</strong> {event.address_event}</p>
                            <p>{event.description_event}</p>

                            <div className="admin-event__actions">
                                <button
                                    type="button"
                                    disabled={processingId === event.id_event}
                                    onClick={() => onModerate(event.id_event, 'approved')}
                                >
                                    Accepter
                                </button>
                                <button
                                    type="button"
                                    disabled={processingId === event.id_event}
                                    onClick={() => onModerate(event.id_event, 'rejected')}
                                >
                                    Refuser
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}