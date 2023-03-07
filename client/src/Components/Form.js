import { useState } from "react";

export default function Form() {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setFirstNameError(isValidText(e.target.firstName.value));
    setLastNameError(isValidText(e.target.lastName.value));
    isEmailValid(e.target.email.value);
    setPasswordError(isValidText(e.target.password.value));

    postData("https://myendpoint.com/api/users", {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const isValidText = (text) => (text !== "" ? false : true);

  const isEmailValid = (email) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    console.log(email.match("password"));

    return email.match(validRegex) ? setEmailError(false) : setEmailError(true);
  };

  const isPasswordValid = (password) =>
    password !== "" ? setPasswordError(false) : setPasswordError(true);

  return (
    <div className='flex-container-col'>
      <div className='trial-message'>
        <h5>Try it free 7 days </h5>
        <p>then $20.mo thereafter</p>
      </div>
      <div className='card-form'>
        <form onSubmit={onSubmit}>
          <div className='form-input'>
            <input type='text' id='firstName' placeholder='First Name' />
            {firstNameError && (
              <img src='/images/icon-error.svg' className='error-icon' />
            )}
          </div>
          <div className='form-input'>
            <input type='text' id='lastName' placeholder='Last Name' />
            {lastNameError && (
              <img src='/images/icon-error.svg' className='error-icon' />
            )}
          </div>
          <div className='form-input'>
            <input type='email' id='email' placeholder='Email Address' />
            {emailError && (
              <img src='/images/icon-error.svg' className='error-icon' />
            )}
          </div>
          <div className='form-input'>
            <input type='password' id='password' placeholder='Password' />
            {passwordError && (
              <img src='/images/icon-error.svg' className='error-icon' />
            )}
          </div>
          <button type='submit' className='button-primary'>
            CLAIM YOUR FREE TRAIL
          </button>
        </form>
        <div className='tos'>
          By clicking the button, you are agreeing to our{" "}
          <b className='tos-bold'>Terms and Services</b>{" "}
        </div>
      </div>
    </div>
  );
}
