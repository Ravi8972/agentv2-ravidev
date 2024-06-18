import React, { useEffect, useRef, useState } from "react";
import usaFlag from "../../assets/images/Usa.png";
import vietnamImg from "../../assets/images/vietnamImg.png";
import phflag from "../../assets/images/Phili.png"
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css"


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem("selectedLanguage", language);
    i18n.changeLanguage(language);
    setIsOpen(false); 
  };

  const getFlag = (language) => {
    switch (language) {
      case "vi":
        return vietnamImg;
      case "ph":
        return phflag;
        case "en":
          default:
        return usaFlag;
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown-container">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="dropdown-button"
    >
      <img
        src={getFlag(selectedLanguage)}
        alt="Selected language flag"
        className="flag-icon"
      />
    </button>

    {isOpen && (
      <div className="dropdown-menu">
        <div className="dropdown-item-container">
        <button
            onClick={() => handleLanguageChange("en")}
            className="dropdown-item"
          >
            <span className="dropdown-item-content">
              <img src={usaFlag} alt="US flag" className="item-flag" />
              English
            </span>
            {selectedLanguage === "en" && (
              <span className="selected-check">&#10003;</span>
            )}
          </button>
          <button
            onClick={() => handleLanguageChange("vi")}
            className="dropdown-item"
          >
            <span className="dropdown-item-content">
              <img
                src={vietnamImg}
                alt="Vietnamese flag"
                className="item-flag"
              />
              Tiếng Việt
            </span>
            {selectedLanguage === "vi" && (
              <span className="selected-check">&#10003;</span>
            )}
          </button>
          <button
            onClick={() => handleLanguageChange("ph")}
            className="dropdown-item"
          >
            <span className="dropdown-item-content">
              <img src={phflag} alt="philippins flag" className="item-flag" />
              Filipino
            </span>
            {selectedLanguage === "ph" && (
              <span className="selected-check">&#10003;</span>
            )}
          </button>
          
        </div>
      </div>
    )}
  </div>
  );
};

export default LanguageSwitcher;
