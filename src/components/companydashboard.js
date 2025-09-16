import { Link, Route, Routes } from "react-router-dom";

import ViewAllCompany from "./viewallcompany";
import AddCompany from "./addcompany";
import ViewAllInternshipsAdmin from "./viewinternadmin";
import AddInternship from "./addinternship";
import UpdateInternship from "./updateinternship";
import ViewApplications from "./viewallapplication";


let CompanyDashboard = () => {
  return (
    <section>
      <div className="bg-success text-white p-3 my-2">
        <Link to="/companydashboard/companies" className="btn btn-light m-2">View All Companies</Link>
        <Link to="/companydashboard/internship" className="btn btn-light m-2">View Internship</Link>
        <Link to="/companydashboard/application" className="btn btn-light m-2">View Applications</Link>
      </div>

      <Routes>
        <Route path="companies" Component={ViewAllCompany}></Route>
        <Route path="addcompany" Component={AddCompany}></Route>
        <Route path="internship" Component={ViewAllInternshipsAdmin}></Route>
        <Route path="addinternship" Component={AddInternship}></Route>
        <Route path="updateinternship/:internId" Component={UpdateInternship}></Route>
        <Route path="application" Component={ViewApplications}></Route>
      </Routes>
    </section>
  );
};

export default CompanyDashboard;
