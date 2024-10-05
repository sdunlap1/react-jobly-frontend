import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

function SignupForm({ signup }) {  
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();

    // Basic form validation: Check if fields are empty
    if (!formData.username || !formData.password || !formData.firstName || !formData.lastName || !formData.email) {
      setFormErrors(["All fields are required."]);
      return;
    }

    const result = await signup(formData);

    if (result.success) {
      // Redirect to login page after successful signup
      navigate("/");
    } else {
      // Display any errors that came from the signup process
      setFormErrors(result.errors);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Display form errors */}
        {formErrors.length ? <p className="error">{formErrors.join(", ")}</p> : null}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupForm;
