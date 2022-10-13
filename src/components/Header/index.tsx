import React from "react";
import { Link } from "react-router-dom";
import ImageLogo from "../../images/logo.svg";
import { Content, LogoImg, Wrapper } from "./Header.styles";

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={ImageLogo} alt="tmdb-logo" />
        </Link>
      </Content>
    </Wrapper>
  );
};

export default Header;
