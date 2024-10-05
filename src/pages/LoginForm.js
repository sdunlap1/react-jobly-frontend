import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    
    // Ensure the username and password are strings
    const formattedData = {
      username: String(formData.username),
      password: String(formData.password),
    };

    const result = await login(formattedData);
    if (result.success) {
      navigate("/"); // Redirect after successful login
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Handle form data changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        
        {formErrors.length ? (
          <div className="error">
            {formErrors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
        ) : null}

        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
