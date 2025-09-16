import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddInternship = () => {
  const [internshipId, setInternshipId] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [description, setDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
   
 const internship = {
    internId: internshipId,
    title: title,
    duration: duration,
    stipend: parseInt(stipend), 
    desc: description,
    comapanyId: parseInt(companyId) 
  };


    fetch("http://localhost:8080/intern/addintern", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(internship)
    })
      .then(response => {
        if (response.ok) {
          setMessage("Internship added successfully!");
          setInternshipId("");
          setTitle("");
          setDuration("");
          setStipend("");
          setDescription("");
          setCompanyId("");
        } else {
          setMessage("Failed to add internship.");
        }
      })
      .catch(err => {
        console.error("Error:", err);
        setMessage("Error occurred.");
      });
  };

  return (
    <div className="col-6 mx-auto p-3">
      <h3 className="bg-success text-white p-2 text-center">Add Internship</h3>
      <input
        type="text"
        placeholder="Internship ID"
        className="form-control m-1"
        value={internshipId}
        onChange={(e) => setInternshipId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        className="form-control m-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Duration"
        className="form-control m-1"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="text"
        placeholder="Stipend"
        className="form-control m-1"
        value={stipend}
        onChange={(e) => setStipend(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="form-control m-1"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company ID"
        className="form-control m-1"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <button onClick={handleSubmit} className="btn btn-success m-2 w-100">
        Save Internship
      </button>
      {message && message.length > 0 && (
        <div className="alert alert-info text-center">{message}</div>
      )}
    </div>
  );
};

export default AddInternship;
