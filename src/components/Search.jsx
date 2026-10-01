import { useState } from "react";

const Search = () => {
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false)

    const getEvents = async () => {
        try {

            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/event?keyword=${search}`
            );

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des événements");
            }

            const data = await response.json();

            setEvents(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div id="search-container">
                <input
                    type="text"
                    placeholder="Recherche un événement..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={getEvents}>Rechercher</button>
            </div>
            {loading && <p>Chargement...</p>}
            <div id="cards">
                {events.getEvent?.map((event) => (
                    <article key={event.id_event}>
                        <a href={`/details?id=${event.id_event}`}>
                            <img src="/public/img/concert_random.jpg" alt="random-concert" />
                            <div>
                                <h2>{event.name_event}</h2>
                                <p>{event.date_event}</p>
                                <p>{event.address_event}</p>
                                <p>{event.description_event}</p>
                            </div>
                        </a>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Search