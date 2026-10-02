const EventCard = ({ name, date, address, description, id }) => {
    return (
        <article>
            <a href={`/details?id=${id}`}>
                <img src="/public/img/concert_random.jpg" alt="random-concert" />
                <div>
                    <h2>{name}</h2>
                    <p> {date} </p>
                    <p> {address} </p>
                    <p> {description} </p>
                </div>
            </a>
        </article>
    )
}
export default EventCard