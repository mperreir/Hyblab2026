

export default function Credit() {
  return (
    <div className="credit-container">
      <div className="credit-header">
        <img src="./portraits/colin.png" alt="Portrait Colin" className="biographie-portrait" />
        <div className="class-all-credit">
          <h1 className="credit-titre">CREDITS</h1>
          <p>
            Membres du groupe
          </p>
          <div className="class-designer-member">
              <p>
                Designers
              </p>
              <ul>
                <li>VANTHOURNOUT Emma</li>
                <li>TEILLET Manon</li>
                <li>DOZIAS Adrien </li>
              </ul>
          </div>
          <div className="class-developper-member">
              <p>
                Développeurs
              </p>
              <ul>
                <li>BEN YAHIA Roua</li>
                <li>AHMAT Hassan</li>
                <li>ELLOUBAB Aya</li>
                <li>REBAI Mohamed</li>
                <li>DJAGA Ampère Titus</li> 
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
}