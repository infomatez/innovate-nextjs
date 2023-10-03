// components/ShareModal.tsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
interface ShareModalProps {
  shareType: string; // or the appropriate type
  onClose: () => void;
  shareurl: string;
}

const ShareModal = ({ shareType, onClose, shareurl }: ShareModalProps) => {
  const [url, setUrl] = useState('');
  const closeModal = () => {
    onClose();
  };
  const handleCopy = () => {
    console.log('lInk copied');
  };
  let modalTitle = '';
  if (shareType === 'post') {
    modalTitle = 'Share Post';
  } else if (shareType === 'profile') {
    modalTitle = 'Share Profile';
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between mb-4">
          <div className="text-2xl font-bold">{modalTitle}</div>
          <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
            Close
          </button>
        </div>
        <div className="flex space-x-4 mb-4">
          <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-3xl" />
          <FontAwesomeIcon icon={faTwitter} className="text-blue-400 text-3xl" />
          <FontAwesomeIcon icon={faInstagram} className="text-purple-600 text-3xl" />
          <FontAwesomeIcon icon={faWhatsapp} className="text-green-600 text-3xl" />
        </div>
        <input
          type="text"
          value={shareurl}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to share"
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
          onClick={handleCopy}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
