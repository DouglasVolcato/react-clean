import React from "react";
import Spinner from "../spinner/spinner";
import "./form-status-styles.scss";

const FormStatus: React.FC = () => {
  return (
    <div className="errorWrap">
      <Spinner />
      <span className="error">Error</span>
    </div>
  );
};

export default FormStatus;
