import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../images/UPNLOGO.png';

const HalamanLoading = () => {

const navigate = useNavigate();
    const handleClickAnywhere = () => {
    navigate('/HalamanUtama');
  };

  return (
    <section
      className="hero is-fullheight"
      style={{ backgroundColor: '#213b3a', cursor: 'pointer' }}
      onClick={handleClickAnywhere}
    >
      <div className="hero-body">
        <div className="container has-text-centered">
          <img src={logo} alt="UPN Logo" width="300" />
          <h1 className="title has-text-white mt-4" style={{ fontSize: '40px', fontWeight: 'bold' }}>
            Aplikasi Persuratan<br />kegiatan kemahasiswaan
          </h1>
          <p className="has-text-white mt-3" style={{ fontSize: '25px' }}>
            Mempermudah dan mempercepat proses administratif surat menyurat untuk kegiatan mahasiswa
          </p>
        </div>
      </div>
    </section>
  )
}

export default HalamanLoading