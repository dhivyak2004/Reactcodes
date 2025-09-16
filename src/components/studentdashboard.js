import { Link, Route, Routes } from "react-router-dom";
import Profile from "./profile";
import SearchCompany from "./searchcompany";
import ViewIntern from "./viewintern";
import ViewAllIntern from "./viewallintern";
import MyApplication from "./myapplication";
import MyApplications from "./myapplication";
import ApplyInternship from "./applyinternship";

const StudentDashBoard = () => {
    // const student = JSON.parse(localStorage.getItem("student"));
    // const studentName = student ?.name || "Student";

    return (
        <section>
            <div className="bg-dark text-white p-3 my-2">
                {/* <h4>Welcome, {studentName}!</h4> */}
                <Link to="/studentdashboard/profile" className="btn btn-light m-2">Profile Setup</Link>
                <Link to="/studentdashboard/companies" className="btn btn-light m-2">Search Companies</Link>
                <Link to="/studentdashboard/internships" className="btn btn-light m-2">View Internships</Link>
                <Link to="/studentdashboard/application" className="btn btn-light m-2">My Applications</Link>
            </div>
            <Routes>
                <Route path="profile" Component={Profile} />
                <Route path="companies" Component={SearchCompany} />
                <Route path="/viewintern/:companyName" Component={ViewIntern} />
                <Route path="application" Component={MyApplications} />
                <Route path="internships" Component={ViewAllIntern} />
                <Route path="apply/:internId" Component={ApplyInternship} />
            </Routes>
        </section>
    );
};

export default StudentDashBoard;
