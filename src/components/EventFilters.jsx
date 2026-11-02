const categories = [
  'Tous',
  'Concert',
  'Festival',
  'Cinéma',
  'Exposition',
  'Sport',
]

const EventFilters = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}) => (
  <div id="search-container">
    <h2>Explorer les événements !</h2>

    <input
      type="text"
      placeholder="Recherche un événement..."
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
    />

    <div id="filter">
      {categories.map((item) => (
        <button
          key={item}
          type="button"
          className={category === item ? 'active' : ''}
          onClick={() => onCategoryChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
)

export default EventFilters