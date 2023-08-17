import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const intialValues = {
    username: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    setFormValues(intialValues);
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!values.username) {
      errors.username = "Username is Required";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please Enter a Valid Email";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 Characters";
    }
    return errors;
  };
  useEffect(() => {
    console.log("formerrors", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  console.log("formValues", formValues);
  return (
    <div className="form-container">
      <h2>Login Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter a Username"
            value={formValues.username}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.username}</p>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Enter a Email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.email}</p>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="text"
            name="password"
            placeholder="Enter a Fullname"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.password}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
