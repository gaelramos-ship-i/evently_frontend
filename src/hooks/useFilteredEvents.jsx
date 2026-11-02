const useFilteredEvents = (events, search, category) => {
  return events.filter((event) => {
    const matchesSearch =
      search.length < 3 ||
      event.name_event?.toLowerCase().includes(search.toLowerCase()) ||
      event.description_event?.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      category === 'Tous' || event.type_event === category

    return matchesSearch && matchesCategory
  })
}

export default useFilteredEvents