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
      <img
        src={pictogramme}
        // className="absolute object-contain"
        className="class-pictogramme-openPopup"
        // style={{ top: 14, left: 16, width: 44, height: 44 }}
      />
      <div className={`class-pupop ${animClass}`} onClick={(e) => e.stopPropagation()}>
        <h1>{type}</h1>
        <button className="class-close-popup" onClick={handleClose}>X</button>
      </div>
    </div>
  );
}
