import React, { useState } from "react";

export interface FormValues {
  name: string;
  email: string;
  phoneNum: string;
}

interface FormProps {
  submitButtonText: string;
  onSubmit: (participant: FormValues) => void;
}

export const Form: React.FC<FormProps> = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Use onSubmit function to pass new participant to the App
    props.onSubmit({
      name: name,
      email: email,
      phoneNum: phoneNum
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Full name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        className="form-control"
        id="email"
        placeholder="E-mail address"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="form-control"
        id="phoneNum"
        placeholder="Phone number"
        value={phoneNum}
        onChange={e => setPhoneNum(e.target.value)}
      />
      <input type="submit" className="btn btn-primary" value={props.submitButtonText}/>
    </form>
  );
};
