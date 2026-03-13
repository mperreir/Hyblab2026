//import { useEffect, useRef, useState } from "react";
//import ReactPlayer from "react-player";
//import { Document, Page, pdfjs } from "react-pdf";

//pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import { useState } from "react";

export default function Popup({pictogramme, type, onClick }) {
  const [animClass, setAnimClass] = useState("open");


  function handleClose() {
    setAnimClass("close");
    setTimeout(() => {
      onClick();
    }, 350);
  }

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className={`class-pupop ${animClass}`} onClick={(e) => e.stopPropagation()}>
        <img
          src={pictogramme}
          // className="absolute object-contain"
          alt="pictogramme"
          className="class-pictogramme-openPopup"
          // style={{ top: 14, left: 16, width: 44, height: 44 }}
        />
        <h1>{type}</h1>
        <button className="class-close-popup" onClick={handleClose}>X</button>
      </div>
    </div>
  );
}
