import { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  render() {
    return (
      <header>
        <form onSubmit={this.props.onSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>
          <input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
