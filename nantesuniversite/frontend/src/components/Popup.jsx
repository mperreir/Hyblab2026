import { useState } from "react";

export default function Popup({ pictogramme, type, url, title, onClick }) {
  const [animClass, setAnimClass] = useState("open");

  function handleClose() {
    setAnimClass("close");
    setTimeout(() => {
      onClick();
    }, 350);
  }

  function renderContent() {
    if (type === "pdf") {
      return (
        <embed
          src={url}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "4px" }}
        />
      );
    }

    if (type === "video") {
      return (
        <video
          controls
          style={{ width: "100%", height: "100%", objectFit: "contain", background: "#000", borderRadius: "4px" }}
        >
          <source src={url} />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      );
    }

    // type === "web" (default)
    return (
      <iframe
        src={url}
        title={title}
        width="100%"
        height="100%"
        style={{ border: "none", borderRadius: "4px" }}
        allowFullScreen
      />
    );
  }

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className={`class-pupop ${animClass}`} onClick={(e) => e.stopPropagation()}>
        <img
          src={pictogramme}
          alt="pictogramme"
          className="class-pictogramme-openPopup"
        />
        <button className="class-close-popup" onClick={handleClose}>✕</button>
        {title && <h2 className="popup-title">{title}</h2>}
        <div className="popup-content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
