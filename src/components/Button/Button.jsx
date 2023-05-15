import { Component } from 'react';
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.onNextPage}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onNextPage: PropTypes.func,
};
