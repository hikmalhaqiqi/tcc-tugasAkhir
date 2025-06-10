import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BASE_URL } from "../utils";
import { jwtDecode } from "jwt-decode";

const DetailAdmin = () => {
  const [nama_kegiatan, setNamaKegiatan] = useState("");
  const [rincian_kegiatan, setRincianKegiatan] = useState("");
  const [program_studi, setProgramStudi] = useState("");
  const [tanggal_jam_mulai, setTanggalJamMulai] = useState("");
  const [tanggal_jam_selesai, setTanggalJamSelesai] = useState("");
  const [file_pendukung_url, setFilePendukung] = useState(null);
  const [status, setStatus] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");


  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ mengambil ID dari URL
  console.log("ID dari URL:", id);

  const getDataSuratById = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/DataSurat/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      const data = response.data;
      console.log("Data dari API:", data);
      setNamaKegiatan(data.nama_kegiatan || "");
      setRincianKegiatan(data.rincian_kegiatan || "");
      setProgramStudi(data.program_studi || "");
      setTanggalJamMulai(data.tanggal_jam_mulai || "");
      setTanggalJamSelesai(data.tanggal_jam_selesai || "");
      setFilePendukung(data.file_pendukung_url || "");
      setStatus(data.status || "");
      setKeterangan(data.keterangan || "");
      
    } catch (error) {
      console.log("Error fetching Message data:", error);
      console.log("Error response data:", error.response.data);
    }
  }, [id]);

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


  const formatDatetimeLocal = (dateStr) => {
    if (!dateStr) return ""; // handle null/undefined

    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    getDataSuratById();
  }, [getDataSuratById]);

  const updateDataSurat = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${BASE_URL}/update/${id}`, {
        status,
        keterangan,
      });
      navigate("/admindashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="box">
          <form onSubmit={updateDataSurat}>
            <div className="field">
              <label className="label">Nama Kegiatan</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Masukkan nama kegiatan"
                  value={nama_kegiatan}
                  //onChange={(e) => setNamaKegiatan(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Rincian Kegiatan</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Masukkan rincian kegiatan"
                  value={rincian_kegiatan}
                  //onChange={(e) => setRincianKegiatan(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Program Studi</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Masukkan program studi"
                  value={program_studi}
                  //onChange={(e) => setProgramStudi(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Tanggal dan Jam Mulai</label>
                  <div className="control">
                    <input
                      className="input"
                      type="datetime-local"
                      value={formatDatetimeLocal(tanggal_jam_mulai)}
                      //onChange={(e) => setTanggalJamMulai(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Tanggal dan Jam Selesai</label>
                  <div className="control">
                    <input
                      className="input"
                      type="datetime-local"
                      value={formatDatetimeLocal(tanggal_jam_selesai)}
                      //onChange={(e) => setTanggalJamSelesai(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Status</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="">-- Pilih Status --</option>
                    <option value="pending">Pending</option>
                    <option value="diterima">Diterima</option>
                    <option value="ditolak">Ditolak</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Keterangan</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Tambahkan keterangan jika perlu"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  //required
                />
              </div>
            </div>

            <div className="columns is-vcentered mt-5">
              <div className="column">
                <div className="field">
                  <div className="control">
                    <a
                      href={file_pendukung_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button is-small is-info"
                    >
                      Lihat File Pendukung
                    </a>
                  </div>
                </div>
              </div>
              <div className="column is-narrow">
                <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-success">
                      Selesai
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DetailAdmin;