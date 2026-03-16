

export default function Coordonnees() {
  return (
    <div style={{ marginTop: "80px", marginLeft: "90px" }}>
      <p style={{ fontSize: "50px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px",color: "#ffffff",fontFamily: "Inter, sans-serif"}}>
        Pour aller plus loin
      </p>
      <p style={{ fontSize: "20px", margin: "0 0 20px", color: "#ffffff" }}>
        Découvrez la <strong>Chaire Unesco Relia</strong> de Nantes Université
      </p>

      <div style={{
        display: "flex", alignItems: "center", gap: "200px", flexWrap: "wrap", paddingTop: "60px",
      }}>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" ,left:"66px"}}>
            <img src="./images/logoPC.svg"></img>
          <a href="https://chaireunescorelia.univ-nantes.fr/" target="_blank" rel="noreferrer" style={{ fontSize: "24px" ,color: "#ffffff"  }}>
            https://chaireunescorelia.univ-nantes.fr/
          </a>
        </div>


        <div style={{ display: "flex", alignItems: "center", gap: "10px",left:"854px" }}>
            <img src="./images/logoMap.svg"></img> 
          <span style={{ fontSize: "24px", lineHeight: 1.5 ,color: "#ffffff" }}>
            Halle 6 Ouest - Bureau 308<br/>
            42 rue de la Tour d'Auvergne
          </span>
        </div>


        <div style={{ display: "flex", alignItems: "center", gap: "10px",color: "#ffffff",left:"1255px"  }}>
            <img src="./images/logoEmail.svg"></img>
          <a href="mailto:chaireunescorelia@univ-nantes.fr" style={{ fontSize: "24px" }}>
            chaireunescorelia@univ-nantes.fr
          </a>
        </div>
      </div>
    </div>
  );
}
