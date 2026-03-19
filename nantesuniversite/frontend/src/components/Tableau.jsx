import data from "../data/data.json";

const documents = data.researcher.documents.filter(
  (doc) => doc.category !== "Biographie"
);

const PAGE_SIZE = 5;

export default function DocumentsSources({ open, onToggle, page, onPageChange }) {
  const totalPages = Math.ceil(documents.length / PAGE_SIZE);
  const visible = documents.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div
      style={{
        marginLeft: "120px",
        width: "1680px",
        fontFamily: "'Chakra Petch', sans-serif",
        color: "#ffffff",
      }}
    >
      {/* Header row — arrow on the far right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={onToggle}
      >
        <p style={{ fontSize: "48px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
          DOCUMENTS SOURCES
        </p>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "52px",
            height: "52px",
            border: "3px solid #ffffff",
            borderRadius: "50%",
            flexShrink: 0,
            transition: "transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      <hr style={{ border: "none", borderTop: "3px solid #ffffff", margin: "14px 0 0", width: "100%" }} />

      {/* Animated collapsible wrapper */}
      <div
        style={{
          maxHeight: open ? "500px" : "0px",
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transition: "max-height 0.45s ease, opacity 0.35s ease",
        }}
      >
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "12px 8px", fontSize: "18px", color: "rgba(255,255,255,0.6)", fontWeight: 600, textAlign: "left", width: "55%" }}>Titre</th>
                <th style={{ padding: "12px 8px", fontSize: "18px", color: "rgba(255,255,255,0.6)", fontWeight: 600, textAlign: "left", width: "20%" }}>Catégorie</th>
                <th style={{ padding: "12px 8px", fontSize: "18px", color: "rgba(255,255,255,0.6)", fontWeight: 600, textAlign: "left", width: "15%" }}>Date</th>
                <th style={{ padding: "12px 8px", fontSize: "18px", color: "rgba(255,255,255,0.6)", fontWeight: 600, textAlign: "left", width: "10%" }}>Format</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
                  <td style={{ padding: "12px 8px", fontSize: "20px", width: "55%" }}>
                    {doc.url ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#ffffff", textDecoration: "underline" }}
                      >
                        {doc.title}
                      </a>
                    ) : (
                      <span style={{ color: "#ffffff" }}>{doc.title}</span>
                    )}
                  </td>
                  <td style={{ padding: "12px 8px", fontSize: "20px", color: "#ffffff", width: "20%" }}>{doc.category}</td>
                  <td style={{ padding: "12px 8px", fontSize: "20px", color: "#ffffff", width: "15%" }}>{doc.date || "—"}</td>
                  <td style={{ padding: "12px 8px", fontSize: "20px", color: "#ffffff", width: "10%", textTransform: "uppercase" }}>{doc.type || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)" }}>
              {page + 1} / {totalPages}
            </span>
            <button
              disabled={page === 0}
              onClick={() => onPageChange(page - 1)}
              style={{
                background: "transparent",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: page === 0 ? "not-allowed" : "pointer",
                opacity: page === 0 ? 0.35 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              disabled={page === totalPages - 1}
              onClick={() => onPageChange(page + 1)}
              style={{
                background: "transparent",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
                opacity: page === totalPages - 1 ? 0.35 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
