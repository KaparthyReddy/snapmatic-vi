type PreviewOverlayProps = {
  dataUrl: string;
  onClose: () => void;
};

export default function PreviewOverlay({ dataUrl, onClose }: PreviewOverlayProps) {
  return (
    <div className="vi-preview">
      <button className="vi-iconbtn vi-preview__close" onClick={onClose} aria-label="Close preview">
        ✕
      </button>
      <img src={dataUrl} alt="Full preview" className="vi-preview__image" />
    </div>
  );
}
