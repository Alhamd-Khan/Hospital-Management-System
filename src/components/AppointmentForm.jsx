import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState("");

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const navigateTo = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: false }
        );
        console.log("Fetched doctors:", response.data.doctors);
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          address,
          hasVisited: hasVisitedBool,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const inputGroupStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  };

  const inputStyle = {
    flex: 1,
    height: "48px",
    padding: "10px",
    fontSize: "14px",
  };

  const dateInputWrapper = {
    position: "relative",
    flex: 1,
  };

  const dateLabelStyle = {
    position: "absolute",
    top: "6px",
    left: "12px",
    fontSize: "12px",
    color: "#555",
    backgroundColor: "white",
    padding: "0 4px",
    pointerEvents: "none",
    userSelect: "none",
  };

  const dateInputStyle = {
    width: "100%",
    height: "48px",
    padding: "18px 12px 6px",
    fontSize: "14px",
  };

  // Add debug log for department and filtered doctors
  console.log("Selected department:", department);
  console.log(
    "Filtered doctors:",
    doctors.filter((doctor) => doctor.doctorDepartment === department)
  );

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div style={inputGroupStyle}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <input
            type="text"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            style={inputStyle}
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ ...inputStyle }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div style={inputGroupStyle}>
          <div style={dateInputWrapper}>
            <label style={dateLabelStyle}>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={dateInputStyle}
            />
          </div>
          <div style={dateInputWrapper}>
            <label style={dateLabelStyle}>Appointment Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              style={dateInputStyle}
            />
          </div>
        </div>

        <div style={inputGroupStyle}>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
            style={{ ...inputStyle }}
          >
            <option value="">Select Department</option>
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>

          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [first, ...rest] = e.target.value.split(" ");
              setDoctorFirstName(first);
              setDoctorLastName(rest.join(" "));
            }}
            disabled={!department}
            style={{ ...inputStyle }}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor, index) => (
                <option
                  key={index}
                  value={`${doctor.firstName} ${doctor.lastName}`}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>

        <textarea
          rows="5"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            marginBottom: "1rem",
            resize: "vertical",
          }}
        />

        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
            display: "flex",
            marginBottom: "1rem",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ flex: "none", width: "25px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button type="submit">GET APPOINTMENT</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
