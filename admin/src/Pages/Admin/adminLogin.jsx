import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Actions/userAction";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import './admin.css';

const Logo = `${process.env.REACT_APP_API_URL}/assets/images/logo-white.webp`;

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('login');
const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isLoggedIn } = useSelector(state => state.loginAdmin);
 const storedValue = localStorage.getItem('user');
  // const handleTabClick = (tab) => (e) => {
  //   e.preventDefault();
  //   setActiveTab(tab);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
setTimeout(() => {
   setIsSubmitting(true)
}, 100);
   
    
   const response = dispatch(login(email, password, 'admin'));
    setIsSubmitting(false)
    if(storedValue){
    setIsSubmitting(true)
    }else{
    //  alert('error')
         toast.error(error)
      }
      
    // }
    }catch(error){
     toast.error(error)
      setIsSubmitting(false)
    }
  };

 const styles = {
    disabledButton: {
      backgroundColor: 'gray',
      color: 'white',
      cursor: 'not-allowed',
      border: '0px'
    },
    enabled: {
      cursor: 'pointer'
    }
  }

  useEffect(() => {
    if (storedValue) {
      toast.success("Login successful. Redirecting...");
    navigate('/dashboard')
    }
  }, [storedValue, navigate]);

  return (
    <div className='max-w-7xl m-auto h-screen'>
      <div className='mx-auto h-full flex items-center'>
        <div className='px-[15px] m-auto max-w-[560px] w-full'>
          <div className='flex flex-col lg:border border-[#dee0ea] rounded-[2px] lg:p-[60px]'>
            <div className="flex justify-center">
              <NavLink to="https://clotyaecom.vercel.app/" className="block w-auto">
                <LazyLoadImage
                  src={Logo}
                  alt="Clotya"
                  className="header-logo invert w-[121px] md:w-[200px]"
                />
              </NavLink>
            </div>

            <div className={`flex w-full form-wrapper ${activeTab === 'login' ? 'my-element' : 'my-element active'}`}>
              <div id='login-form' className='mt-[20px] px-[1px] w-full'>
                <form onSubmit={handleSubmit} className='flex flex-col mt-[20px]'>
                  <p className='mb-[16px]'>
                    <label htmlFor="email" className='text-[14px] mb-[5px]'>
                      Email address <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='border rounded-[3px] border-[#ddd] py-[8px] px-[15px] w-full'
                      required
                    />
                  </p>
                  <p className='mb-[16px]'>
                    <label htmlFor="password" className='text-[14px] mb-[5px]'>
                      Password <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="password"
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='border rounded-[2px] border-[#ddd] py-[8px] px-[15px] w-full'
                      required
                    />
                  </p>
                  <input type="hidden" name="role" value="admin" />
                  <p className='mb-[16px] flex gap-[4px]'>
                    <input type="checkbox" className='border rounded-[2px] border-[#ddd]' />
                    <span className='text-[14px]'>Remember me</span>
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                     style={isSubmitting ?
                  styles.disabledButton : styles.enabled}
                    className='hover:opacity-[0.8] border border-[#ee403d] mb-[16px] text-white bg-[#ee403d] py-[8px] px-[15px] w-fit rounded-[2px]'
                  >
                    {isSubmitting ? "Processing..." : "Login"}
                  </button>
                  <ToastContainer position="top-center" theme="colored" autoClose={3000} />
 {/* {isLoggedIn && <div className="text-primary-red mb-[16px] p-[16px] border border-[#ddd] text-[14px]">isLoggedIn</div>} */}
                  {/* {error && <div className="text-primary-red mb-[16px] p-[16px] border border-[#ddd] text-[14px]">{error}</div>}
                  {formSuccess && <div className="text-success mb-[16px] p-[16px] border border-[#ddd] text-[14px]">{formSuccess}</div>} */}
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
