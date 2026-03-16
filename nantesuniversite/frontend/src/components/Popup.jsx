import { useState } from "react";
import Biography from "./Biography";
import Credit from "./Credit";

export default function Popup({ pictogramme, type, url, title, onClick }) {
  const [animClass, setAnimClass] = useState("open");
  const [isLoading, setIsLoading] = useState(true);

  function handleClose() {
    setAnimClass("close");
    setTimeout(() => {
      onClick();
    }, 200);
  }

  function handleLoad() {
    setIsLoading(false);
  }

  function renderContent() {
    if (type === "pdf") {
      return (
        <>
          {isLoading && <div className="popup-spinner-overlay"><div className="popup-spinner" /></div>}
          <embed
            src={url}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: "4px" }}
            onLoad={handleLoad}
          />
        </>
      );
    }

    if (type === "video") {
      return (
        <>
          {isLoading && <div className="popup-spinner-overlay"><div className="popup-spinner" /></div>}
          <iframe title="Video player" src={url} allowFullScreen allow="autoplay" style={{ border: "none", borderRadius: "4px", width: "100%", height: "100%" }} onLoad={handleLoad}></iframe>
        </>
      );
    }

    if (type === "biographie"){
      return (
        <Biography />
      )
    }

    if (type === "credits") {
      return <Credit />;
    }

    // type === "web" (default)
    return (
      <>
        {isLoading && <div className="popup-spinner-overlay"><div className="popup-spinner" /></div>}
        <iframe
          src={url}
          title={title}
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "4px" }}
          allowFullScreen
          onLoad={handleLoad}
        />
      </>
    );
  }

  return (
    <div className="popup-overlay" onClick={handleClose} onWheel={(e) => e.stopPropagation()}>
      <div className={`class-pupop ${animClass}`} onClick={(e) => e.stopPropagation()}>
        {pictogramme && (
          <img
            src={pictogramme}
            alt="pictogramme"
            className="class-pictogramme-openPopup"
          />
        )}
        <button className="class-close-popup" onClick={handleClose}>✕</button>
        {title && <h2 className="popup-title">{title}</h2>}
        <div className="popup-content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
