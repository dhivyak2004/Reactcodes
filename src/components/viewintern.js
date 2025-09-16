import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ViewIntern = () => {
    const { companyName } = useParams();
    const [internships, setInternships] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/intern/viewinternshipByCompanyName/${companyName}`)
            .then(response => response.json())
            .then(data => setInternships(data))
            .catch(err => {
               console.error(err);
               setInternships([]);
            });

    }, [companyName]);

    return (
        <div className="container mt-4">
            <h3 className="text-center text-success">Internships at {companyName}</h3>
            <div className="row">
                {internships.length > 0 ? (
                    internships.map((i) => (
                        <div className="col-md-4 mb-3" key={i.internship_id}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{i.title}</h5>
                                    <p className="card-text">
                                        <strong>Duration:</strong> {i.duration}<br />
                                        <strong>Stipend:</strong> {i.stipend}<br />
                                        <strong>Description:</strong> {i.desc}
                                    </p>
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

export default ViewIntern;
