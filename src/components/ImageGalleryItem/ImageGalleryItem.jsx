import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onClickImage,
}) => {
  return (
    <>
      <li>
        <img
          onClick={() => onClickImage(largeImageURL)}
          src={webformatURL}
          alt={tags}
          largeimage={largeImageURL}
        />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  onClickImage: PropTypes.func,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
