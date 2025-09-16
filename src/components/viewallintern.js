import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewAllIntern = () => {
    const [internships, setInternships] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/intern/viewallintern")
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch internships");
                return response.json();
            })
            .then(data => setInternships(data))
            .catch(err => {
                console.error(err);
                setInternships([]);
            });
    }, []);

    const handleApply = (internId) => {
        navigate(`/studentdashboard/apply/${internId}`);
    };

    return (
        <div className="container mt-4">
            <h3 className="text-center text-success">All Internship Opportunities</h3>
            <div className="row">
                {internships.length > 0 ? (
                    internships.map((i) => (
                        <div className="col-md-4 mb-3" key={i.internId}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{i.title}</h5>
                                    <p className="card-text">
                                        <strong>Intern Id:</strong> {i.internId}<br />
                                        <strong>Duration:</strong> {i.duration}<br />
                                        <strong>Stipend:</strong> ₹{i.stipend}<br />
                                        <strong>Description:</strong> {i.desc}<br />
                                        <strong>Company:</strong> {i.company.name}<br />
                                        <strong>Location:</strong> {i.company.location}
                                    </p>
                                    <button className="btn btn-primary" onClick={() => handleApply(i.internId)}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info col-6 mx-auto text-center">
                        No internships available
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAllIntern;
