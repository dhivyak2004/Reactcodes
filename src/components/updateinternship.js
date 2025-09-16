import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateInternship = () => {
  const { internId } = useParams();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [description, setDescription] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/intern/updatestudent/${internId}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setDuration(data.duration);
        setStipend(data.stipend);
        setDescription(data.desc);
        setCompanyId(data.company.companyId);
      })
      .catch(error => {
        console.error("Error fetching internship:", error);
        setMessage("Failed to load internship details.");
      });
  }, [internId]);

  const handleUpdate = () => {
   
 const updatedInternship = {
    internId: parseInt(internId),
    title: title,
    duration: duration,
    stipend: parseInt(stipend),
    desc: description,
    comapanyId: parseInt(companyId) 
  };


    fetch(`http://localhost:8080/intern/updateintern`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInternship)
    })
      .then(response => {
        if (response.ok) {
          setMessage("Internship updated successfully!");
        } else {
          setMessage("Failed to update internship.");
        }
      })
      .catch(err => {
        console.error("Error:", err);
        setMessage("Error occurred during update.");
      });
  };

  return (
    <div className="col-6 mx-auto p-3">
      <h3 className="bg-warning text-white p-2 text-center">Update Internship</h3>
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
      <button onClick={handleUpdate} className="btn btn-warning m-2 w-100">
        Update Internship
      </button>
      {message && message.length > 0 && (
        <div className="alert alert-info text-center">{message}</div>
      )}
    </div>
  );
};

export default UpdateInternship;
