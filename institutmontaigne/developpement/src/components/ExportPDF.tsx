import React from "react";

const ExportPDF: React.FC = () => {
    const handleExport = () => {
        window.print();
    };

    return (
        <button
        className="mx-auto my-5"
            onClick={handleExport}
            style={{
                border: "none",
                display: "flex",
                borderRadius: "999px",
                padding: "0.5em 1.5em",
                background: "#1976d2",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "background 0.2s",
            }}
        >
            Exporter PDF
        </button>
    );
};

export default ExportPDF;