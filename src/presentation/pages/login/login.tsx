import React, { useEffect, useState } from "react";
import "./login-styles.scss";
import LoginHeader from "../../components/login-header/login-header";
import Footer from "../../components/footer/footer";
import Input from "../../components/input/input";
import FormStatus from "../../components/form-status/form-status";
import Context from "../../contexts/form/form-context";
import { Validation } from "../../protocols/validation";

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  useEffect(() => {
    setErrorState({
      ...errorState,
      emailError: validation.validate("email", state.email),
    });
  }, [state.email]);

  useEffect(() => {
    setErrorState({
      ...errorState,
      passwordError: validation.validate("password", state.password),
    });
  }, [state.password]);

  return (
    <div className="login">
      <LoginHeader />
      <Context.Provider value={{ ...state, ...errorState, setState }}>
        <form className="form">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Write your email" />
          <Input
            type="password"
            name="password"
            placeholder="Write your password"
          />
          <button
            data-testid="submit"
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
