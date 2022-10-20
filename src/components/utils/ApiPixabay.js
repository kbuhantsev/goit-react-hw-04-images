import axios from 'axios';
import { PixabaySettings } from 'constants';

const { API_KEY, PER_PAGE, BASE_URL } = PixabaySettings;
export default class ApiPixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getImages() {
    const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${PER_PAGE}`;

    const response = await axios.get(URL);
    this.incrementPage();
    return response.data;
  }

  incrementPage() {
    this.page++;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
