const EventCard = ({ name, date, address, description }) => {
    return (
        <article>
            <div>
                <h2>{name}</h2>
                <p> {date} </p>
                <p> {address} </p>
                <p> {description} </p>
            </div>
        </article>
    )
}
export default EventCard