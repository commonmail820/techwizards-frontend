import React, { useState } from "react";

interface FormData {
  full_name: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
}

interface ApiResponse {
  detail?: string;
  message?: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const res = await fetch("https://techwizards-backend.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await res.json();

      if (res.ok) {
        setMessage("✅ Signup successful!");
      } else {
        setMessage(`❌ Error: ${data.detail || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage("❌ Request failed. Check your network or server.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    margin: '16px 0',
    backgroundColor: '#d4af37',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const messageStyle: React.CSSProperties = {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '4px',
    backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da',
    color: message.includes('✅') ? '#155724' : '#721c24',
    border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <input 
          name="full_name" 
          placeholder="Full Name" 
          onChange={handleChange} 
          required 
          style={inputStyle}
          value={formData.full_name}
        />
        <input 
          name="username" 
          placeholder="Username" 
          onChange={handleChange} 
          required 
          style={inputStyle}
          value={formData.username}
        />
        <input 
          name="email" 
          placeholder="Email" 
          type="email" 
          onChange={handleChange} 
          required 
          style={inputStyle}
          value={formData.email}
        />
        <input 
          name="password" 
          placeholder="Password" 
          type="password" 
          onChange={handleChange} 
          required 
          style={inputStyle}
          value={formData.password}
        />
        <input 
          name="phone_number" 
          placeholder="Phone Number" 
          onChange={handleChange} 
          style={inputStyle}
          value={formData.phone_number}
        />

        <button type="submit" style={buttonStyle}>
          Sign Up
        </button>
      </form>

      {message && <div style={messageStyle}>{message}</div>}
    </div>
  );
};

export default SignupForm; 