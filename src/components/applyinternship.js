import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApplyInternship = () => {
    const { internId } = useParams();
    const navigate = useNavigate();

    const [appId, setAppId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [skills, setSkills] = useState("");
    const [status] = useState("APPLIED");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!appId || isNaN(appId)) newErrors.appId = "Valid Application ID is required.";
        if (!studentId || isNaN(studentId)) newErrors.studentId = "Valid Student ID is required.";
        if (!skills.trim()) newErrors.skills = "Skills are required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const application = {
            appId: parseInt(appId),
            studId: parseInt(studentId),
            internId: internId,
            date: new Date().toISOString().split("T")[0],
            status: status,
            skills: skills.trim()
        };

        fetch("http://localhost:8080/intern/addApplication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application)
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to apply");
            return res.json();
        })
        .then(data => {
            alert("Application submitted successfully!");
            navigate("/studentdashboard");
        })
        .catch(err => {
            console.error(err);
            alert("Error submitting application");
        });
    };

    return (
        <div className="container mt-4">
            <h3 className="text-center text-primary">Apply for Internship</h3>
            <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                <div className="mb-3">
                    <label className="form-label">ID</label>
                    <input
                        type="text"
                        className={`form-control ${errors.appId ? "is-invalid" : ""}`}
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                
                    />
                    {errors.appId && <div className="invalid-feedback">{errors.appId}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Register Number</label>
                    <input
                        type="text"
                        className={`form-control ${errors.studentId ? "is-invalid" : ""}`}
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                
                    />
                    {errors.studentId && <div className="invalid-feedback">{errors.studentId}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Skills</label>
                    <input
                        type="text"
                        className={`form-control ${errors.skills ? "is-invalid" : ""}`}
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
            
                    />
                    {errors.skills && <div className="invalid-feedback">{errors.skills}</div>}
                </div>

                <button type="submit" className="btn btn-success">Submit Application</button>
            </form>
        </div>
    );
};

export default ApplyInternship;
