import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/intern/viewallcompany")
            .then(response => response.json())
            .then(data => setCompanyList(data));
    }, []);

    const searchCompany = () => {
        const url = companyName.trim() === ""
            ? "http://localhost:8080/intern/viewallcompany"
            : `http://localhost:8080/intern/viewcompanyByName/${companyName}`;

        fetch(url)
            .then(response => {
                if (response.ok) return response.json();
                else throw new Error("Company not found");
            })
            .then(data => setCompanyList(data))
            .catch(err => {
                console.error(err);
                setCompanyList([]);
            });
    };

    const deleteCompany = (companyId) => {
        fetch(`http://localhost:8080/intern/deletecompany/${companyId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                searchCompany();
            } else {
                throw new Error("Failed to delete company");
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <section className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="w-75">
                    <input
                        type="text"
                        placeholder="Enter Company Name"
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="form-control d-inline-block w-75"
                    />
                    <button
                        className="btn btn-warning ml-2"
                        onClick={searchCompany}
                    >
                        Search
                    </button>
                </div>
                <div>
                    <Link to="/companydashboard/addcompany" className="btn btn-success">
                        + Add Company
                    </Link>
                </div>
            </div>

            {/* Company cards */}
            <div className="row">
                {companyList.length > 0 ? (
                    companyList.map((c) => (
                        <div className="col-md-4 mb-3" key={c.companyId}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{c.name}</h5>
                                    <p className="card-text">
                                        <strong>CompanyID:</strong> {c.companyId}<br />
                                        <strong>Location:</strong> {c.location}
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteCompany(c.companyId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-danger col-6 mx-auto text-center">
                        No companies found
                    </div>
                )}
            </div>
        </section>
    );
};

export default SearchCompany;
