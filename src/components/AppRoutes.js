import { Link, Route, Routes, useLocation } from "react-router-dom";
import StudentDashBoard from "./studentdashboard";
import CompanyDashBoard from "./companydashboard";
import StudentLogin from "./studentlogin";
import CompanyLogin from "./companylogin";

const AppRoutes = () => {
  const location = useLocation();
  const hideIntro = location.pathname.includes("dashboard");

  return (
    <article>
      {!hideIntro && (
        <>
          <section className="text-center my-4 px-3">
            <div className="alert alert-info" role="alert">
              Welcome to the Intern Application Portal! 🚀<br />
              Please choose your role below to log in and access your dashboard.
            </div>
          </section>

          <section className="d-flex justify-content-center gap-4 mb-5">
            <Link to="/studentlogin" className="btn btn-warning text-white px-4 py-2 shadow">
              Student
            </Link>
            <Link to="/companylogin" className="btn btn-warning text-white px-4 py-2 shadow">
              Company Admin
            </Link>
          </section>
        </>
      )}

      <section>
        <Routes>
          <Route path="/studentlogin" Component={StudentLogin}/>
          <Route path="/companylogin" Component={CompanyLogin} />
          <Route path="/studentdashboard/*" Component={StudentDashBoard } />
          <Route path="/companydashboard/*" Component={CompanyDashBoard} />
        </Routes>
      </section>
    </article>
  );
};

export default AppRoutes;
