import React, { useState } from "react";
import "./login-styles.scss";
import LoginHeader from "../../components/login-header/login-header";
import Footer from "../../components/footer/footer";
import Input from "../../components/input/input";
import FormStatus from "../../components/form-status/form-status";
import Context from "../../contexts/form/form-context";

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: "",
  });

  return (
    <div className="login">
      <LoginHeader />
      <Context.Provider value={state}>
        <form className="form">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Write your email" />
          <Input
            type="password"
            name="password"
            placeholder="Write your password"
          />
          <button
            data-testId="submit"
            disabled
            className="submit"
            type="submit"
          >
            Send
          </button>
          <span className="link">Create an account</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
