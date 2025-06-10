import React from 'react';
import logo from '../images/UPNLOGO.png'; // Pastikan path sesuai lokasi file logomu
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const Navbar = () => {
  const navigate = useNavigate();
  
  const Logout = async() => {
    try {
      await axios.delete(`${BASE_URL}/logout`);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="navbar has-background-green" style={{ backgroundColor: '#213b3a' }} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} alt="Logo UPN" width="30" height="45" />
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenu" className="navbar-menu">
        <p style={{ fontSize: '15px', color: 'white', fontWeight: 'bold' }} className="navbar-item">
    Aplikasi persuratan kegiatan kemahasiswaan
  </p>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={Logout} className="button is-light">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;