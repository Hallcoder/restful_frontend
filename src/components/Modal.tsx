// components/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-6/12 shadow-lg relative">
                <button
                    className="absolute text-3xl border rounded-full px-2 py-1 top-2 right-2 text-gray-700 hover:text-gray-900"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="mt-4">
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default Modal;
