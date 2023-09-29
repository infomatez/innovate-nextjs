import React from 'react';

type LogoutConfirmationPopupProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const LogoutConfirmationPopup: React.FC<LogoutConfirmationPopupProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="popup-background">
      <div className="popup">
        <p>Are you sure you want to log out?</p>
        <div className='popup-buttons'>
        <button className="confirm-button" onClick={onConfirm}>
          Yes
        </button>
        <button className="cancel-button" onClick={onCancel}>
          No
        </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationPopup;
