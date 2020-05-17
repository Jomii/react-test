import React, { useState, useEffect } from "react";
import { validate, FieldType } from "../utils/Validator";
import { Participant } from "../App";

export interface FormValues {
  name: string;
  email: string;
  phoneNum: string;
}

interface FormProps {
  submitButtonText: string;
  onSubmit: (participant: FormValues) => void;
  data?: Participant | null;
  onCancel?: () => void;
  secondaryStyle?: boolean;
}

export const Form: React.FC<FormProps> = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phoneNum: false,
  });

  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setEmail(props.data.email);
      setPhoneNum(props.data.phoneNum);
    }
  }, [props.data]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Use onSubmit function to pass new participant to the App
    if (isFormValid()) {
      props.onSubmit({
        name: name,
        email: email,
        phoneNum: phoneNum,
      });

      clearForm();
    }
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPhoneNum("");
    setErrors({
      name: false,
      email: false,
      phoneNum: false,
    });

    if (props.onCancel) {
      props.onCancel();
    }
  }

  /**
   * Returns true if the form is valid
   */
  function isFormValid(): boolean {
    let newErrors = { ...errors };
    newErrors.name = !validate(name, FieldType.Required);
    newErrors.email = !validate(email, FieldType.Email);
    newErrors.phoneNum = !validate(phoneNum, FieldType.Phone);
    setErrors(newErrors);

    // If there are no errors the form is valid and true is returned
    return Object.values(newErrors).reduce(
      (noErrorsFound, error) => noErrorsFound && !error,
      true
    );
  }

  const customStyle = props.secondaryStyle ? {color: "#757575", backgroundColor: "#EBEBEB", border: "none"} : {};

  return (
    <form onSubmit={handleSubmit} className="form-row bg-white">
      <div className="col">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <label className="text-danger" htmlFor="name">
            Please enter a name
          </label>
        )}
      </div>

      <div className="col">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="E-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <label className="text-danger" htmlFor="email">
            Please enter an email address
          </label>
        )}
      </div>

      <div className="form-group col">
        <input
          type="text"
          className="form-control"
          id="phoneNum"
          placeholder="Phone number"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
        {errors.phoneNum && (
          <label className="text-danger" htmlFor="phoneNum">
            Please enter a phone number as XXXXXXXXXX
          </label>
        )}
      </div>

      <div className="col pr-0">
        <input
          type="submit"
          className="btn btn-primary float-right ml-2"
          style={customStyle}
          value={props.submitButtonText}
        />

        {props.onCancel && (
          <button
            type="button"
            className="btn btn-secondary float-right"
            onClick={clearForm}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
