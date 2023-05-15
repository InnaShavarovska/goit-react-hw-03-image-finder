import { Component } from 'react';
import { Notify } from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchHitsByQuery } from 'Api';

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

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      query: event.target.search.value,
      isLoading: true,
      images: [],
    });
  };

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  onNextPage = () => {
    this.setState({
      page: this.state.page + 1,
      isLoading: true,
    });
    this.fetchGallery(this.state.query, this.state.page + 1);
  };

  async fetchGallery(query, page) {
    try {
      const response = await fetchHitsByQuery(query, page);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...response],
        };
      });
      if (response.length < 12) {
        this.setState({ showBtn: false });
      }
      if (response.length === 12) {
        this.setState({ showBtn: true });
      }
      if (response.length === 0) {
        Notify.failure('No matches found!');
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { images, isLoading, showBtn, showModal, largeImageURL } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} onClickImage={this.onClickImage} />
        {isLoading && <Loader />}
        {showBtn && <Button onNextPage={this.onNextPage} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}
