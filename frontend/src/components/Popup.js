import { useEffect } from "react";

const Popup = ({ isOpen, onClose, children, popupContainer, name }) => {

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
  return (
    <div className={`popup ${isOpen && 'popup_opened'} ${name}`} onClick={handleOverlay}>
      <div className={popupContainer}>
        <button className='popup__close-button' type='button' onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Popup;