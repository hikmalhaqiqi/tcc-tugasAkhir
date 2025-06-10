import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";

const HalamanAdmin = () => {
  const [DataSurat, setDataSurat] = useState([]);
  const [expire, setExpire] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);
  const refreshToken = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/token`);
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getDataSurat();
  }, []);

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axiosJWT.get(`${BASE_URL}/token`);
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getDataSurat = async () => {
    const response = await axios.get(`${BASE_URL}/DataSurat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDataSurat(response.data);
  };

  const deleteDataSurat = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/DataSurat//${id}`);
      deleteDataSurat();
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className="container mt-5">
      <table className="table is-bordered is-fullwidth mt-3">
        <thead>
          <tr>
            <th>Nama Kegiatan</th>
            <th>Rincian Kegiatan</th>
            <th>Program Studi</th>
            <th>Status</th>
            <th>Keterangan</th>
            <th>Detail</th>
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
              <td className="buttons is-flex is-flex-wrap-nowrap gap-2">
                <Link
                  to={`/detailsurat/${surat.id}`}
                  className="button is-small is-info"
                >
                  Cek
                </Link>
                <button
                  onClick={() => deleteDataSurat(surat.id)}
                  className="button is-small is-danger"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HalamanAdmin;
