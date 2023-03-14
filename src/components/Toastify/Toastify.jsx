import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';

function Toastify({ massage }) {
  const notify = () => {
    toast.info(`${massage}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  return (
    <>
      <ToastContainer toast={notify()} />
    </>
  );
}

Toastify.propTypes = {
  massage: PropTypes.string.isRequired,
};

export default Toastify;
