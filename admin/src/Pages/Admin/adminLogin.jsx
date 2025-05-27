import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import './admin.css'
const Logo = `${process.env.REACT_APP_API_URL}/assets/images/logo-white.webp`;
function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => (e) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)

    const signInData = { email, password };
    console.log(signInData);
    setError("");
    try {
      const response = await fetch(`http://localhost:5000/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or user not found");
      }

      const data = await response.json();

     
      if (data.user.role === 'admin') {
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("token", data.token);
        localStorage.setItem('isUserLoggedIn', 'true');
        window.location.href = '/dashboard';
        alert(`Welcome back, ${data.user.name}!`);
      } else {
        setError('Invalid User Role');
      }

    } catch (err) {
      setError(err.message);
    }
  };



  // const handleLogin = (e) => {
  //   console.log('shshs')
  //   e.preventDefault();

  //   const userUsername = process.env.REACT_APP_ADMIN_ADMINNAME;
  //   const userPassword = process.env.REACT_APP_ADMIN_PASSWORD;
  //   const email = process.env.REACT_APP_ADMIN_EMAIL

  //   if (username === userUsername && password === userPassword) {

  //     localStorage.setItem('isUserLoggedIn', 'true');
  //     sessionStorage.setItem('isUserLoggedIn', 'true');
  //     console.log('shshs')
  //     window.location.href = '/dashboard';
  //   } else {
  //     setError('Error: Invalid username or password');
  //   }
  // };

  return (

    <div className=' my-[80px] max-w-7xl mx-auto '>
      <div className='mt-[]  mx-auto'>
        <div className='px-[15px] mx-auto max-w-[560px] w-full'>
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
                    Login
                  </button>
                  {error && <div className="text-black mb-[16px] p-[16px] border border-[#ddd] text-[14px]">{error}</div>}

                  {/* <p className="">
                  <a href="#" className='text-[16px] text-[#ee403d] no-underline'>Lost your password?</a>
                </p> */}
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
