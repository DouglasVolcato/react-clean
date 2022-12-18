import React from "react";
import "./login-styles.scss";
import Spinner from "../../components/spinner/spinner";
import Logo from "../../components/logo/logo";

const Login: React.FC = () => {
  return (
    <div className="login">
      <header className="header">
        <Logo />
        <h1>React Webpage</h1>
      </header>
      <form className="form">
        <h2>Login</h2>
        <div className="inputWrap">
          <input type="email" name="email" placeholder="Write your email" />
          <span className="status"></span>
        </div>
        <div className="inputWrap">
          <input
            type="password"
            name="password"
            placeholder="Write your password"
          />
          <span className="status"></span>
        </div>
        <button className="submit" type="submit">
          Send
        </button>
        <span className="link">Create an account</span>
        <div className="errorWrap">
          <Spinner />
          <span className="error">Error</span>
        </div>
      </form>
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default Login;
