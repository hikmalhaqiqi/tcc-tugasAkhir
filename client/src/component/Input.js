import React ,{ useState} from 'react'
import axios from 'axios'
import  { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils';

const Input = () => {
    const [nama_kegiatan, setNamaKegiatan] = useState("");
    const [rincian_kegiatan, setRincianKegiatan] = useState("");
    const [program_studi, setProgramStudi] = useState("");
    const [tanggal_jam_mulai, setTanggalJamMulai] = useState("");
    const [tanggal_jam_selesai, setTanggalJamSelesai] = useState("");
    const [file_pendukung_url, setFilePendukung] = useState(null);
    const [ msg, setMsg] = useState("");
    const navigate = useNavigate();


    const Input = async(e) => {
   e.preventDefault();
try {
      const formData = new FormData();
      formData.append("nama_kegiatan", nama_kegiatan);
      formData.append("rincian_kegiatan", rincian_kegiatan);
      formData.append("program_studi", program_studi);
      formData.append("tanggal_jam_mulai", tanggal_jam_mulai);
      formData.append("tanggal_jam_selesai", tanggal_jam_selesai);
      formData.append("file_pendukung_url", file_pendukung_url); // File object

      await axios.post(`${BASE_URL}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/HalamanUtama");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div onSubmit={Input} className="box"> {/* Memberikan border dan padding seperti kontainer form */}
          <form> {/* onSubmit dihapus untuk versi tampilan saja */}
            {/* Nama Kegiatan */}
            <div className="field">
              <label className="label" htmlFor="namaKegiatan">Nama Kegiatan</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="namaKegiatan"
                  name="namaKegiatan"
                  // value dan onChange dihapus
                  placeholder="Masukkan nama kegiatan" value = {nama_kegiatan} onChange={(e) => setNamaKegiatan(e.target.value)}// Placeholder opsional
                  required
                />
              </div>
            </div>

            {/* Rincian Kegiatan */}
            <div className="field">
              <label className="label" htmlFor="rincianKegiatan">Rincian Kegiatan</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="rincianKegiatan"
                  name="rincianKegiatan"
                  placeholder="Masukkan rincian kegiatan" value = {rincian_kegiatan} onChange={(e) => setRincianKegiatan(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Program Studi */}
            <div className="field">
              <label className="label" htmlFor="programStudi">Program Studi</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="programStudi"
                  name="programStudi"
                  placeholder="Masukkan program studi" value = {program_studi} onChange={(e) => setProgramStudi(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Tanggal dan Jam Mulai & Selesai */}
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="tanggalMulai">Tanggal dan Jam Mulai</label>
                  <div className="control">
                    <input
                      className="input"
                      type="datetime-local"
                      id="tanggalMulai"
                      name="tanggalMulai" 
                      required
                      value = {tanggal_jam_mulai} onChange={(e) => setTanggalJamMulai(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="tanggalSelesai">Tanggal dan Jam Selesai</label>
                  <div className="control">
                    <input
                      className="input"
                      type="datetime-local"
                      id="tanggalSelesai"
                      name="tanggalSelesai" 
                      required
                      value = {tanggal_jam_selesai} onChange={(e) => setTanggalJamSelesai(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Baris Tombol Upload File dan Ajukan */}
            <div className="columns is-vcentered mt-5">
              <div className="column">
                <div className="field">
                  <div className="control">
                    <div className="file has-name">
                      <label className="file-label">
                        <input
                          className="file-input"
                          type="file"
                          name="file_pendukung_url"
                          id="file_pendukung_url"
                          onChange={(e) => setFilePendukung(e.target.files[0])}
                        />
                        <span className="file-cta">
                          <span className="file-label">
                            Upload File Pendukung
                          </span>
                        </span> 
                        
                        {/* Bagian untuk menampilkan nama file bisa dikosongkan atau diberi placeholder jika perlu */}
                        <span className="file-name">
                          {file_pendukung_url ? file_pendukung_url.name : 'Belum ada file dipilih'}
                        </span> 
                      </label>
                      
                    </div>
                    <p>*FIle pendukung adalah surat dan proposal (dijadikan satu file)</p>

                  </div>
                </div>
              </div>
              <div className="column is-narrow">
                <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-success">
                      Ajukan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Input