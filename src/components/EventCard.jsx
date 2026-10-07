const EventCard = ({ name, date, address, description, id, idUser, onAddFavorite, onDeleteFavorite, isFavorite = false, showDelete = false, image_event }) => {

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            onDeleteFavorite(id)
        } else {
            onAddFavorite(idUser, id)
        }
    }
    return (
        <article>
            <a href={`/details?id=${id}`}>
                <img src={`http://localhost:3000${image_event}`} alt="random-concert" />
                
                <div>
                    <h2>{name}</h2>
                    {showDelete ? (
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
                    ) : (
                        <button
                            type="button"
                            className="favorite-button"
                            onClick={handleFavorite}
                        >
                            {isFavorite ? "♥" : "♡"}
                        </button>
                    )}
                    <p> {date} </p>
                    <p> {address} </p>
                    <p> {description} </p>
                </div>
            </a>
        </article>
    )
}
export default EventCard