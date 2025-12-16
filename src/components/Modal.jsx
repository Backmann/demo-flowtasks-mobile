export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="m-backdrop" onClick={onClose}>
      <div className="m-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="m-head">
          <div className="m-title">{title}</div>
          <button className="m-x" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="m-body">{children}</div>
      </div>
    </div>
  );
}
