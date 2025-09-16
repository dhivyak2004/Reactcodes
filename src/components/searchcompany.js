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

    return (
        <section className="container mt-4">
            <div className="text-center mb-4">
                <input
                    type="text"
                    placeholder="Enter Company Name"
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="form-control d-inline-block w-50"
                />
                <button
                    className="btn btn-warning ml-2"
                    onClick={searchCompany}
                >
                    Search
                </button>
            </div>

            <div className="row">
                {companyList.length > 0 ? (
                    companyList.map((c) => (
                        <div className="col-md-4 mb-3" key={c.company_id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{c.name}</h5>
                                    <p className="card-text">
                                        <strong>Location:</strong> {c.location}
                                    </p>
                                    <Link
                                        to={`/studentdashboard/viewintern/${c.name}`}
                                        className="btn btn-outline-primary mt-2"
                                    >
                                        View Internships
                                    </Link>
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
