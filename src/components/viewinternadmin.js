import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewAllInternshipsAdmin = () => {
    const [internships, setInternships] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/intern/viewallintern")
            .then(response => response.json())
            .then(data => setInternships(data))
            .catch(error => {
                console.error("Error fetching internships:", error);
                setInternships([]);
            });
    }, []);

    return (
        <section className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-success">Available Internships</h2>
                <Link to="/companydashboard/addinternship" className="btn btn-success">
                    + Add Internship
                </Link>
            </div>

            <div className="row">
                {internships.length > 0 ? (
                    internships.map((intern) => (
                        <div className="col-md-4 mb-3" key={intern.internId}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{intern.title}</h5>
                                    <p className="card-text">
                                        <strong>Intern ID:</strong> {intern.internId}<br />
                                        <strong>Company:</strong> {intern.company.name}<br />
                                        <strong>Duration:</strong> {intern.duration}<br />
                                        <strong>Stipend:</strong> {intern.stipend}<br />
                                        <strong>Description:</strong> {intern.desc}
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Link
                                        to={`/companydashboard/updateinternship/${intern.internId}`}
                                        className="btn btn-outline-warning"
                                    >
                                        Update
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-warning col-6 mx-auto text-center">
                        No internships available
                    </div>
                )}
            </div>
        </section>
    );
};

export default ViewAllInternshipsAdmin;
