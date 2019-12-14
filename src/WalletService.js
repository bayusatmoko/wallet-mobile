import axios from 'axios';
import { getBaseURL } from '../config';

export default class NewsService {
  constructor() {
    this._baseUrl = getBaseURL();
  }

  getNews() {
    const url = `${this._baseUrl}/users`;
    return axios.get(url);
  }

  getCategories() {
    const url = `${this._baseUrl}/users`;
    return axios.get(url);
  }
}
