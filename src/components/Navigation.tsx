import React from "react";
import "../styles/Navigation.css";

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="partner-logos">
          <img src="/images/1.png" alt="Logo 1" className="partner-logo" />
          <img src="/images/2.png" alt="Logo 2" className="partner-logo" />
          <img src="/images/3.png" alt="Logo 3" className="partner-logo" />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
