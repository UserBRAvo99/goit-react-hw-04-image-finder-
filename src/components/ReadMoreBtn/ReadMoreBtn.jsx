import PropTypes from 'prop-types';

function ReadMoreBtn({ title, event }) {
  return (
    <button type="button" className="Button" onClick={event}>
      {title}
    </button>
  );
}

ReadMoreBtn.propTypes = {
  title: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
};

export default ReadMoreBtn;
