import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CircularProgress } from '@mui/material';
import { NavLink } from "react-router-dom";
import './admin.css'
const Logo = `${process.env.REACT_APP_API_URL}/assets/images/logo-white.webp`;
function UserLogin() {
  const [username, setUsername] = useState('');
   const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(false);
  
  const [formSuccess, setFormSuccess] = useState("");

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => (e) => {
    e.preventDefault();
    setActiveTab(tab);
  };


    const baseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'  // or whatever your local API URL is
        : process.env.REACT_APP_API_URL;


  const resetForm = () => {
    // setUsername("")
    setPassword('');
    setEmail('');

  }

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)

    setLoading(true);
    const signInData = { email, password };
    console.log(signInData);
    setError("");
    // resetForm();
   
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });

      if (!response.ok) {
         setLoading(false);
        throw new Error("Invalid credentials or user not found");
      }

      const data = await response.json();


      if (data.user.role === 'admin') {
          setLoading(false);
        setFormSuccess('LoggedIn successfully')
        
        // setTimeout(() => {
        //   setFormSuccess('');

        // }, 10000);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("token", data.token);
        localStorage.setItem('isUserLoggedIn', 'true');
        window.location.href = '/dashboard';

      } else {
         setLoading(false);
        setError('Invalid User Role');
        // resetForm();
        setTimeout(() => {
          setError('');

        }, 10000);
      }

    } catch (err) {
      setError(err.message);
      // resetForm();
      setTimeout(() => {
        setError('');

      }, 10000);
    }
  };




  return (

    <div className='  max-w-7xl m-auto h-screen '>
      <div className='mt-[]  mx-auto h-full flex items-center'>
        <div className='px-[15px] m-auto max-w-[560px] w-full'>
          <div className='flex flex-col  lg:border border-[#dee0ea;] rounded-[2px] lg:p-[60px]'>
            <div className="flex justify-center">
              <NavLink to="https://clotyaecom.vercel.app/" className="block w-auto">
                <LazyLoadImage
                  src={Logo}
                  alt="Clotya"

                  className="header-logo invert w-[121px] md:w-[200px]"
                />
              </NavLink>
            </div>

            <div className={`flex w-[100%] form-wrapper ${activeTab === 'login' ? 'my-element ' : 'my-element active'}`}>
              <div id='login-form' className={` mt-[20px] px-[1px] w-full `}>
                <form onSubmit={handleLogin} className='flex flex-col mt-[20px]'>
                  <p className='mb-[16px]'>
                    <label htmlFor="email" className=' text-[14px] mb-[5px]'>Email address&nbsp;<span className="required" aria-hidden="true">*</span></label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                      className='border rounded-[3px] border-[#ddd] py-[8px] px-[15px] w-full'
                      required
                    /></p>
                  <p className='mb-[16px]'>
                    <label htmlFor="password" className=' text-[14px] mb-[5px]'>Password&nbsp;<span className="required" aria-hidden="true">*</span></label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=""
                      className='border rounded-[2px] border-[#ddd] py-[8px] px-[15px] w-full'
                    required
                    />
                  </p>
                  <p className='mb-[16px] flex gap-[4px]'> <input
                    type="checkbox"

                    className='border rounded-[2px] border-[#ddd] py-[5px] px-[20px]'

                  />
                    <span className=' text-[14px]'>Remember me</span>

                  </p>

                  <button
                    type="submit"
                    className='hover:opacity-[0.8] border border-[#ee403d;] mb-[16px] text-white bg-[#ee403d] py-[8px] px-[15px] w-fit rounded-[2px]'
                  >
                  {loading ? "loading..." : "Login"}
                  </button>
                 

                  {error && <div className="text-primary-red mb-[16px] p-[16px] border border-[#ddd] text-[14px] ">{error}</div>}
                  {formSuccess && (


                    <span className='mb-[16px] p-[16px] border border-[#ddd] text-[14px] flex text-success'>{formSuccess}</span>

                  )}

                  {/* <div className='justify-center flex gap-2'>
                    {loading && (<>
                      <CircularProgress
                        sx={{
                          color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'dark' ? 400 : 800],
                        }}
                        size={20}
                        thickness={4}
                        value={100}
                      />
                      Loading..
                    </>
                    )} </div> */}
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
