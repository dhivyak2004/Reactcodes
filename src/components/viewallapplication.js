import { useEffect, useState } from "react";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [editStatusId, setEditStatusId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/intern/viewallapplications")
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error("Error fetching applications:", err));
  }, []);

  const handleStatusUpdate = (appId) => {
    fetch(`http://localhost:8080/intern/updatestatus/${appId}?newStatus=${newStatus}`, {
      method: "PUT",
    })
      .then((res) => {
        if (res.ok) {
          alert("Status updated successfully!");
          
          return fetch("http://localhost:8080/intern/viewallapplications")
            .then((res) => res.json())
            .then((data) => {
              setApplications(data);
              setEditStatusId(null);
              setNewStatus("");
            });
        } else {
          alert("Failed to update status.");
        }
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  return (
    <section className="p-3">
      <h3 className="text-center">Internship Applications</h3>
      {applications.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Internship Title</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.appId}>
                <td>{app.appId}</td>
                <td>{app.stud.name}</td>
                <td>{app.stud.email}</td>
                <td>{app.intern.company.name}</td>
                <td>{app.intern.title}</td>
                <td>{app.date}</td>
                <td>{app.status}</td>
                <td>
                  {editStatusId === app.appId ? (
                    <>
                      <input
                        type="text"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        placeholder="Enter new status"
                      />
                      <button
                        className="btn btn-sm btn-success m-1"
                        onClick={() => handleStatusUpdate(app.appId)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setEditStatusId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => setEditStatusId(app.appId)}
                    >
                      Change Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No applications found.</p>
      )}
    </section>
  );
};

export default ViewApplications;
