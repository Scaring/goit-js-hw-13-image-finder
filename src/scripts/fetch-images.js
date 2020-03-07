const mainUrl = 'https://pixabay.com/api/';

export default {
  page: 1,
  per_page: 6,
  query: '',

  fetchImages() {
    const API_KEY = '15456193-1a0f9fc7d1c8c40e5d352d336';
    const requestParams = `&q=${this.query}`;
    return fetch(
      `${mainUrl}?key=${API_KEY}${requestParams}&per_page=${this.per_page}&page=${this.page}`,
    )
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrimentPage();
        return parsedResponse.hits;
      })
      .catch(err => console.warn(err));
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrimentPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
