export default {
  data() {
    return {
      urlApi: "https://mindhub-xj03.onrender.com/api/amazing",
      events: [],
      filteredEvents: [],
      categories: [],
      selectedCategories: [],
      searchTerm: ""
    };
  },
  async mounted() {
    await this.fetchData();
    this.updateResults();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(this.urlApi);
        const { events } = await response.json();
        this.events = events;
        this.filteredEvents = events.filter((event) => event.date).sort((a, b) => a.name.localeCompare(b.name));
        this.categories = [...new Set(events.map((event) => event.category))].sort();
      } catch (error) {
        console.error("Error al recuperar los datos de la API:", error);
      }
    },
    updateResults() {
      this.filteredEvents = this.events.filter((event) => {
        return (
          event.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
          (this.selectedCategories.length === 0 || this.selectedCategories.includes(event.category))
        );
      });
    }
  }
};