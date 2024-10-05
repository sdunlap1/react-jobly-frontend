import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import "../App.css";

function ProfileForm({ updateProfile }) {
  const { currentUser } = useUser();
  const initialFormState = { firstName: "", lastName: "", email: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    
    // Validate email format using a regex
    if (formData.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setFormErrors(["Please enter a valid email address."]);
      return;
    }
  
    const dataToUpdate = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value.trim() !== "")
    );
  
    if (Object.keys(dataToUpdate).length === 0) {
      setFormErrors(["Please fill in at least one field."]);
      return;
    }
  
    const result = await updateProfile(dataToUpdate);
    if (result.success) {
      setFormErrors([]);
      alert("Profile updated successfully!");
      setFormData(initialFormState);
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <div>
      <h1>Current profile</h1>

      {/* Display current user information */}
      <div className="current-user-info">
        <p><strong>Username:</strong> {currentUser.username}</p>
        <p><strong>First Name:</strong> {currentUser.firstName}</p>
        <p><strong>Last Name:</strong> {currentUser.lastName}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
      </div>

      {/* Form to update profile */}
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Update your profile in the fields below</h2>
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="New first name"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="New last name"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="New email"
          />
        </div>

        {formErrors.length ? <p className="error">{formErrors.join(", ")}</p> : null}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
