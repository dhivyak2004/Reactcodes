import { useState } from "react";

const Profile = () => {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
   

  const [studentIdError, setStudentIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [yearError, setYearError] = useState("");

  const validate = () => {
    let isValid = true;
    setStudentIdError("");
    setNameError("");
    setEmailError("");
    setDepartmentError("");
    setYearError("");

    if (!studentId || studentId.length !== 3 || isNaN(studentId)) {
      setStudentIdError("Enter exactly 3 digits for Student ID");
      isValid = false;
    }

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      setNameError("Name should contain only letters and spaces.");
      isValid = false;
    }

    const emailexpr =/^[a-zA-z]+[@]+[a-zA-z]+[.](com|co.in)$/;
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailexpr.test(email)) {
      setEmailError("Enter a valid email");
      isValid = false;
    }

    if (!department) {
      setDepartmentError("Department is required.");
      isValid = false;
    }

    const yearNum = parseInt(year);
    if (!year || isNaN(yearNum) || yearNum < 1 || yearNum > 4) {
      setYearError("Year must be between 1 and 4.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const student = {
      studId: studentId,
      name: name,
      email: email,
      dept: department,
      year: parseInt(year)
    };

    fetch("http://localhost:8080/intern/addstudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    })
      .then(response => {
        if (response.ok) {
          setMessage("Profile saved successfully!");
          setStudentId("");
          setName("");
          setEmail("");
          setDepartment("");
          setYear("");

          // Clear errors
          setStudentIdError("");
          setNameError("");
          setEmailError("");
          setDepartmentError("");
          setYearError("");
        } else {
          setMessage("Failed to save profile.");
        }
      })
      .catch(err => {
        console.error("Error:", err);
        setMessage("Error occurred.");
      });
  };

  return (
    <div className="col-6 mx-auto p-3">
      <h3 className="bg-info text-white p-2">Student Profile Setup</h3>

      <input
        type="text"
        placeholder="Student ID"
        className="form-control m-1"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      {studentIdError && <div className="text-danger">{studentIdError}</div>}

      <input
        type="text"
        placeholder="Name"
        className="form-control m-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {nameError && <div className="text-danger">{nameError}</div>}

      <input
        type="email"
        placeholder="Email"
        className="form-control m-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <div className="text-danger">{emailError}</div>}

      <input
        type="text"
        placeholder="Department"
        className="form-control m-1"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      {departmentError && <div className="text-danger">{departmentError}</div>}

      <input
        type="number"
        placeholder="Year (1 to 4)"
        className="form-control m-1"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      {yearError && <div className="text-danger">{yearError}</div>}

      <button onClick={handleSubmit} className="btn btn-secondary m-2">
        Save Profile
      </button>

      {message && <div className="alert alert-info">{message}</div>}
    </div>
  );
};

export default Profile;
