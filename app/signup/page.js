"use client";

import { useRef } from "react"; // useRef is a hook imported to access import values
import useAuth from "../hooks/useAuth"; // using server so .. allowed

export default function SignUpPage() {
  const { signUp } = useAuth();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    signUp({ email, password, name }, (res) => {
      alert(res.data);
    });
  };

  return (
    <>
      <h1>Create New Account</h1>
      <form onSubmit={handleFormSubmission}>
        <div className="row">
          <div className="col-label">
            <label htmlFor="name">Name</label>
          </div>
          <div className="col-input">
            <input type="text" id="name" ref={nameInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-input">
            <input type="email" id="email" ref={emailInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="password">Password</label>
          </div>
          <div className="col-input">
            <input type="password" id="password" ref={passwordInputRef} />
          </div>
        </div>
        <input type="submit" value="Sign Up"/>
      </form>
    </>
  );
}
