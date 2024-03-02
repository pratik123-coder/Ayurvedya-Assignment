"use client"
import React, { useState } from 'react';
import Modal from './modal';

const ModalButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-8">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        Write a Review
      </button>
      <Modal isOpen={open} onClose={handleClose}>
        <div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalButton;
