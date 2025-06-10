import React ,{ useState} from 'react'
import axios from 'axios'
import  { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../utils";

const Halamanlogin = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [ msg, setMsg] = useState("");
  const navigate = useNavigate();
 

const Auth = async(e) => {
   e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password
      });
      navigate("/admindashboard");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <section className="hero has-background-green is-fullheight is-fullwidth" style={{ backgroundColor: '#213b3a' }}> {/* Perbaikan typo: has-bacground-grey -> has-background-grey */}
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered ">
            <div className="column is-4-desktop">
              <form onSubmit={Auth} className='box '>
                <h2 className='title has-text-centered'>Login</h2>
                <p className='has-text-centered'>{ msg }</p>
                <div className='field mt-5'>
                  <label className='label'>Email</label>
                  <div className='control'> {/* Biasanya 'control' bukan 'controls' untuk wrapper input di Bulma */}
                    <input 
                      type="text" 
                      className='input' 
                      placeholder='Email' value = {email} onChange={(e) => setEmail(e.target.value)}// Placeholder disesuaikan dengan label
                    />
                  </div>
                </div>
                <div className='field mt-5'>
                  <label className='label'>Password</label>
                  <div className='control'> {/* Biasanya 'control' bukan 'controls' */}
                    <input 
                      type="password" 
                      className='input' 
                      placeholder='******' value = {password} onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className='has-text-right mt-2'>
                  <Link to="/register" className='has-text-link'>
                  Buat Akun
                  </Link>
                </div>
                
                <div className='field mt-5'>
                  <button className='button is-success is-fullwidth'>
                    Login {/* Tombol memerlukan teks */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Halamanlogin