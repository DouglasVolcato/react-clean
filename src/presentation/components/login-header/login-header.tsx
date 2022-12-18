import React, {memo} from "react";
import Logo from "../logo/logo";
import "./login-header-styles.scss";

const LoginHeader: React.FC = () => {
  return (
    <header className="header">
      <Logo />
      <h1>React Webpage</h1>
    </header>
  );
};

export default memo(LoginHeader);
