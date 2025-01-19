import PropTypes from 'prop-types';

const Card = ({src, alt, cover}) => {
  return (
    <div className="card">
      <div>
        <img className="front" src={src} alt={alt} />
        <img className="back" src={cover} alt="Card Back" />
      </div>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default Card;