import React, { useState } from 'react'
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';

const Register = () => { 
  const [name, setName] = useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [ msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Register = async(e) => {
   e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", {
        name: name,
        email: email,
        password: password,
        confpassword: confpassword
      });
      navigate("/login");
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg);
      }
    }
  }
  return (
    <section className="hero has-background-green is-fullheight is-fullwidth" style={{ backgroundColor: '#213b3a'}}> {/* Perbaikan typo: has-bacground-grey -> has-background-grey */}
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">           
              <form onSubmit={ Register } className='box'>
                <p className='has-text-centered'>{ msg }</p>
                <div className='field mt-5'>
                  <label className='label'>Name</label>
                  <div className='control'> {/* Biasanya 'control' bukan 'controls' untuk wrapper input di Bulma */}
                    <input 
                      type="text" 
                      className='input' 
                      placeholder='Name' value = {name} onChange={(e) => setName(e.target.value)} // Menggunakan state name
                    />
                  </div>
                </div>
                <div className='field mt-5'>
                  <label className='label'>Email</label>
                  <div className='control'> {/* Biasanya 'control' bukan 'controls' untuk wrapper input di Bulma */}
                    <input 
                      type="text" 
                      className='input' 
                      placeholder='Email' value = {email} onChange={(e) => setEmail(e.target.value)}
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
                <div className='field mt-5'>
                  <label className='label'>Confirm Password</label>
                  <div className='control'> {/* Biasanya 'control' bukan 'controls' */}
                    <input 
                      type="password" 
                      className='input' 
                      placeholder='******' value = {confpassword} onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className='field mt-5'>
                  <button className='button is-success is-fullwidth'>
                    Register {/* Tombol memerlukan teks */}
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

export default Register