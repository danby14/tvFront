import React from 'react';

const Modal = ({ title, error, setError }) => {
  function clearModal() {
    setError(null);
  }

  return (
    <div className='modal is-active'>
      <div className='modal-background' onClick={clearModal}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title has-text-danger'>{title}</p>
        </header>
        <section className='modal-card-body'>{error}.</section>
        <footer className='modal-card-foot buttons is-centered'>
          <button className='button is-link is-outlined' onClick={clearModal}>
            Ok
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
