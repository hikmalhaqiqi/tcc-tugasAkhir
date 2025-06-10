import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
//import { Link } from 'react-router-dom';
//import { getDataSurat } from '../../../server/controllers/suratController';

const HalamanUtama = () => {
  const [DataSurat, setDataSurat] = useState([]);
  useEffect(() => {
    getDataSurat();
  }, []);
  
  const getDataSurat = async () => {
    const response = await axios.get(`${BASE_URL}/DataSurat`);
    setDataSurat(response.data);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "diterima":
        return "tag is-success";
      case "pending":
        return "tag is-dark";
      case "ditolak":
        return "tag is-danger";
      default:
        return "tag";
    }
  };

  const navigate = useNavigate();

  const handleNavigatetoInput = () => {
    navigate("/input");
  };

  const handleNavigatetoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="buttons is-right">
        <button className="button is-success" onClick={handleNavigatetoInput}>
          Pengajuan +
        </button>
        <button
          className="button is-success ml-2"
          onClick={handleNavigatetoLogin}
        >
          Login Admin
        </button>
      </div>

      <table className="table is-bordered is-fullwidth mt-3">
        <thead>
          <tr>
            <th>Nama Kegiatan</th>
            <th>Rincian Kegiatan</th>
            <th>Program Studi</th>
            <th>Status</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {DataSurat.map((surat, index) => (
            <tr key={index}>
              <td>{surat.nama_kegiatan}</td>
              <td>{surat.rincian_kegiatan}</td>
              <td>{surat.program_studi}</td>

              <td>
                <span className={getStatusClass(surat.status)}>
                  {surat.status}
                </span>
              </td>
              <td>{surat.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HalamanUtama;