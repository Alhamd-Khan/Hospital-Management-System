import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
      setShowMenu(false);
      navigateTo("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const gotoLogin = () => {
    navigateTo("/login");
    setShowMenu(false);
  };

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "auto";
  }, [showMenu]);

  return (
    <nav className="navbar">
      <div className="logo" style={{cursor: 'pointer'}} onClick={() => navigateTo("/")}> 
        <img src="/images/logo.png" alt="logo" className='logo' />
      </div>

      {/* Home page desktop navbar */}
      {location.pathname === "/" && (
        <>
          <div className="nav-center">
            <Link to="/">HOME</Link>
            <Link to="/appointment">APPOINTMENT</Link>
            <Link to="/about">ABOUT US</Link>
          </div>
          <div className="nav-right">
            {isAuthenticated ? (
              <button className="btn logout-btn" onClick={handleLogout}>LOGOUT</button>
            ) : (
              <button className="btn login-btn" onClick={gotoLogin}>LOGIN</button>
            )}
          </div>
        </>
      )}

      {/* Mobile Hamburger only on appointment route */}
      {location.pathname.startsWith("/appointment") && (
        <>
          <div className={`mobile-menu ${showMenu ? "show" : ""}`}>
            <Link to="/" onClick={() => setShowMenu(false)}>HOME</Link>
            <Link to="/appointment" onClick={() => setShowMenu(false)}>APPOINTMENT</Link>
            <Link to="/about" onClick={() => setShowMenu(false)}>ABOUT US</Link>
            {isAuthenticated ? (
              <button className="btn logout-btn" onClick={handleLogout}>LOGOUT</button>
            ) : (
              <button className="btn login-btn" onClick={gotoLogin}>LOGIN</button>
            )}
          </div>
          <div className="hamburger" onClick={() => setShowMenu(!showMenu)}>
      <GiHamburgerMenu />
    </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
