import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export default function Modal({modalOpen, children, modalClose}) {
    if (!modalOpen) {
        return null;
    }
    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={modalClose} />
            {children}
        </div>,
        document.getElementById('portal')
    )
}   