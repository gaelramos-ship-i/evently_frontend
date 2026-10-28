const EventCard = ({ name, date, address, description, id, idUser, onAddFavorite, onDeleteFavorite, isFavorite = false, showDelete = false, image_event, showUpdate = false, showDelEvent = false, onUpdatePage, onDeleteEvent, showFavorite = true }) => {

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            onDeleteFavorite(id)
        } else {
            onAddFavorite(idUser, id)
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();

        if (showUpdate) {
            onUpdatePage(id)
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        if (showDelEvent) {
            onDeleteEvent(id)
        }
    }

    return (
        <article>
            <a href={`/details?id=${id}`}>
                <img src={`https://eventlybackend.onrender.com${image_event}`} alt={name} />

                <div>
                    <h2>{name}</h2>
                    <p> {date} </p>
                    <p> {address} </p>
                    <p> {description} </p>
                </div>
            </a>
            {showUpdate && (
                <button
                    type="button"
                    onClick={handleEdit}
                >
                    Modifier
                </button>
            )}
            {showDelEvent && (
                <button
                    type="button"
                    onClick={handleDelete}
                >
                    Supprimer
                </button>
            )}
            {showDelete && (
                <button
                    type="button"
                    className="delete-button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDeleteFavorite(id);
                    }}
                >
                    🗑
                </button>
            )}
            {showFavorite && !showDelete && (
                <button
                    type="button"
                    className="favorite-button"
                    onClick={handleFavorite}
                >
                    {isFavorite ? "♥" : "♡"}
                </button>
            )}

        </article>
    )
}
export default EventCard