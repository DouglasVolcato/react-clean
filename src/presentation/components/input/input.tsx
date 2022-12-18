import React, { useContext } from "react";
import "./input-styles.scss";
import Context from "../../contexts/form/form-context";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const value = useContext(Context);
  const error = value[`${props.name}Error`];

  const getTitle = (): string => {
    return error;
  };

  return (
    <div className="inputWrap">
      <input {...props} />
      <span
        data-testId={`${props.name}-status`}
        title={getTitle()}
        className="status"
      ></span>
    </div>
  );
};

export default Input;
