import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setMessage("");

    if (email.length==0) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!email) {
      isValid = false;
    }

    if (password.length==0) {
      setPasswordError("Password is required");
      isValid = false;
    }
    else if(!password){
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = () => {
    if (!validate()) return;

    if (email === "admin@gmail.com" && password === "admin123") {
      navigate("/companydashboard");
    } else {
      setMessage("Invalid company credentials");
    }
  };

  return (
    <div className="container mt-5 col-md-6 mx-auto p-4 border rounded shadow">
      <h2 className="text-center mb-4">Company Login</h2>
      <div className="form-group">
        <input
          type="email"
          className="form-control my-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="text-danger">{emailError}</div>}

        <input
          type="password"
          className="form-control my-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="text-danger">{passwordError}</div>}

        <button className="btn btn-primary w-100 mt-3" onClick={handleLogin}>
          Login
        </button>

        {message && <div className="alert alert-warning mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default CompanyLogin;
