import React, { useContext } from "react";
import Spinner from "../spinner/spinner";
import "./form-status-styles.scss";
import Context from "../../contexts/form/form-context";

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context);

  return (
    <div data-testId="errorWrap" className="errorWrap">
      {isLoading && <Spinner />}
      {errorMessage && <span className="error">Error</span>}
    </div>
  );
};

export default FormStatus;
