import { useEffect } from 'react';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js';

export default function Modal({ open, onClose, title, children }) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {(title || onClose) && (
          <div className="modal-head">
            {title && <h3 className="modal-title">{title}</h3>}
            <button type="button" className="modal-x" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
