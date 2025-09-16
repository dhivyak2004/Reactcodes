import { useState } from "react";

const MyApplications = () => {
    const [studId, setStudId] = useState("");
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");

    const fetchApplications = () => {
        if (studId.trim() === "") {
            setError("Please enter a Student ID.");
            setApplications([]);
            return;
        }

        fetch(`http://localhost:8080/intern/viewAppByStud/${studId}`)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error("Failed to fetch applications");
            })
            .then(data => {
                setApplications(data);
                setError("");
            })
            .catch(err => {
                console.error(err);
                setError("No applications found or error fetching data.");
                setApplications([]);
            });
    };

    return (
        <section>
            <div className="p-2 m-2">
                <input
                    type="text"
                    placeholder="Enter Student ID"
                    onChange={(e) => setStudId(e.target.value)}
                    className="form-control d-inline-block w-auto me-2"
                />
                <button className="btn btn-warning me-2" onClick={fetchApplications}>
                    View Status
                </button>
            </div>

            <div className="col-10 mx-auto bg-info p-3">
                {error && <p className="text-danger text-center">{error}</p>}

                {applications.length > 0 ? (
                    <table className="table table-bordered table-striped table-hover table-primary">
                        <thead>
                            <tr>
                                <th>App ID</th>
                                <th>Company Name</th>
                                <th>Intern Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.appId}>
                                    <td>{app.appId}</td>
                                    <td>{app.intern.company.name}</td>
                                    <td>{app.intern.title}</td>
                                    <td>{app.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !error && <p className="text-center">No applications to display.</p>
                )}
            </div>
        </section>
    );
};

export default MyApplications;
