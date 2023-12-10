import React, { useState } from "react";
import "./Header.scss";
import Button from "../Button/Button";
import BurgerIcon from "../../assets/images/burger-icon.svg";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import Social from "../Social/Social";
import { useNavigate } from "react-router-dom";
import SiteLogo from '../../assets/images/logo.png'
import '../Logo/Logo.scss'

const Header: React.FC = (props) => {
  const navigation = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
            <a href="https://linktr.ee/world.music.geek"
            //onClick={() => navigation("/library")}
            >
                <img src={SiteLogo} alt="Smokyzon Logo" />
            </a>
        </div>
        <Menu position="header" />
        <div className="header__donate-button">
          <Button>Donate</Button>
        </div>
        <div className="header__burger-button">
          <img src={BurgerIcon} onClick={handleClick} alt="" />
        </div>
        <div
          className={`header__burger__wrapper ${
            isMobileMenuOpen ? "burger-active" : ""
          }`}
        >
          <div
            className={`header__burger__menu ${
              isMobileMenuOpen ? "burger-active" : ""
            }`}
          >
            <Menu position="mobile" />
            {/* <Social location="burger" /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
