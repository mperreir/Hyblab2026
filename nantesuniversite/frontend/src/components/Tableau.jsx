export default function DocumentsSources() {
  const documents = [
    { titre: "Titre de l'article", date: "Date de la sortie", format: "Type de format" },
    { titre: "Livre Colin", date: "Aout 2022", format: "PDF" },
    { titre: "Autre Livre de Colin", date: "Septembre 2023", format: "PDF" },

  ];

  return (
    <div style={{ position: "absolute", top: "3800px", left: "120px", fontFamily: "Inter, sans-serif" ,color:"#ffff"}}>
      <p style={{ fontSize: "48px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
          DOCUMENTS SOURCES
        </p>

        <hr style={{ border: "none", borderTop: "3px solid #ffffff", margin: "14px 0 16px",width:"1600px" }} />
         <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {documents.map((doc, i) => (
            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
              <td style={{ padding: "12px 8px", fontSize: "20px", width: "60%" }}>
                <a href="#" style={{ color: "#ffffff", cursor: "pointer" }}>
                  {doc.titre}
                </a>
              </td>
              <td style={{ padding: "12px 8px", fontSize: "20px", color: "#ffffff", width: "20%" }}>{doc.date}</td>
              <td style={{ padding: "12px 8px", fontSize: "20px", color: "#ffffff", width: "20%" }}>{doc.format}</td>
            </tr>
          ))}
        </tbody>
      </table>

        
    </div>
  );
}