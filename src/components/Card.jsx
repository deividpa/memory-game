import PropTypes from 'prop-types';

const Card = ({ card, cover, handleChoice, flipped }) => {

  const { src, alt } = card;

  const handleClick = () => {
    handleChoice(card);
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
          <img className="front" src={src} alt={alt} />
          <img className="back" src={cover} alt="Card Back" onClick={handleClick} />
      </div>
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  cover: PropTypes.string.isRequired,
  handleChoice: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
};

export default Card;