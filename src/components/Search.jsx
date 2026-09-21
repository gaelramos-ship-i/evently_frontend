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
            <input
                type="text"
                placeholder="Recherche un événement..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={getEvents}>Rechercher</button>
            {loading && <p>Chargement...</p>}
            <div>
                {events.getEvent?.map((event) => (
                    <div key={event.id_event}>
                        <h2>{event.name_event}</h2>
                        <p>{event.description_event}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search