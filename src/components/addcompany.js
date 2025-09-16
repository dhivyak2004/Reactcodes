import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCompany= () => {
  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const company = {
      companyId: companyId,
      name: name,
      location: location,
    };

    fetch("http://localhost:8080/intern/addcompany", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(company)
    })
      .then(response => {
        if (response.ok) {
          setMessage("Company added successfully!");
          setCompanyId("");
          setName("");
          setLocation("");
        } else {
          setMessage("Failed to add company.");
        }
      })
      .catch(err => {
        console.error("Error:", err);
        setMessage("Error occurred.");
      });
  };

  return (
    <div className="col-6 mx-auto p-3">
      <h3 className="bg-success text-white p-2 text-center">Add Company</h3>
      <input
        type="text"
        placeholder="Company ID"
        className="form-control m-1"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company Name"
        className="form-control m-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="form-control m-1"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSubmit} className="btn btn-success m-2 w-100">
        Save Company
      </button>
      {message && message.length > 0 && (
        <div className="alert alert-info text-center">{message}</div>
      )}
    </div>
  );
};

export default AddCompany;
