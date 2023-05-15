import { Component } from 'react';
import axios from 'axios';

import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showBtn: false,
    showModal: false,
    largeImageURL: '',
    error: null,
  };

  fetchHitsByQuery = async (query, page) => {
    const response = await axios.get('https://pixabay.com/api/', {
      method: 'get',
      params: {
        key: '34851950-1466f977010869c95ad46e51d',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: page,
      },
    });
    return response.data.hits;
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      query: event.target.search.value,
      isLoading: true,
      images: [],
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
      </div>
    );
  }
}
