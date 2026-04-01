import React, { useState, useContext } from "react";
import { Navigate, useNavigate, Link, useRouteLoaderData } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
      const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nic, setNic] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();
    const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/user/patient/register", 
      { firstName, lastName, email, phone, nic, dob, gender, password, role: "Patient" },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    toast.success(res.data.message);
    setIsAuthenticated(true);
    navigateTo("/");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setNic("");
    setDob("");
    setGender("");
    setPassword("");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Registration failed");
  }
};

    if(isAuthenticated) {
        return <Navigate to ="/" />;
    }
      return <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, porro corporis velit blanditiis nostrum quam.</p>
         <form onSubmit={handleRegister}>
            <div>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div>
                <input type="number" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)}/>
                <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)}/>
            </div>
            <div>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Male">Male</option>  
                  <option value="Female">Female</option>  
                </select>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
             <div
                        style={{
                          gap: "10px",
                          justifyContent: "flex-end",
                          flexDirection: "row",
                        }}
                      >
                        <p style={{ marginBottom: 0 }}>Already Registered?</p>
                        <Link
                          to={"/login"}
                          style={{ textDecoration: "none", color: "#271776ca" }}
                        >
                             Login Now
                        </Link>
                      </div>
                      <div style={{ justifyContent: "center", alignItems: "center" }}>
                        <button type="submit">Register</button>
                      </div>
         </form>
         </div>
};

export default Register;