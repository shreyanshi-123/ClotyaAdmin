import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { createUsers,imageUpload,updateUsers,getUserById } from '../../../Actions/userAction'

import './user.css'

function UserLogin() {
  // Register


  const [editingUser, setEditingUser] = useState(null); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', image: '', role: 'user' });

  const [email, setEmail] = useState('');
  const [formSuccess, setFormSuccess] = useState("");
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

const isLoggedIn = useSelector(state => state.loginAdmin.isLoggedIn);
   const { users = [], loading, error } = useSelector(state => state.newUser);
     const { user,  } = useSelector(state => state.userDetail);
  const { image } = useSelector(state => state.imageUser);
  console.log(image)


  const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'  
    : process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

    } else {
      setPreview(null);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

  };

  const { id } = useParams();
 
  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!id) return;
    
    
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        image: user.image || '',
      });
    
  }, [user]);





const uploadImage = async () => {
  if (!selectedImage) return formData.image || '';

  const data = new FormData();
  data.append('image', selectedImage);

  try {
    const response = await dispatch(imageUpload(data));
    // Assuming your backend returns { filePath: '...' }
    return response.filePath || response.imagePath || formData.image || '';
  } catch (error) {
    alert('Image upload failed: ' + error.message);
    return '';
  }
};

 

const updateUser = async (e) => {
  e.preventDefault();
  if (!id) {
    alert("No user is being edited.");
    return;
  }

  try {
    let imagePath = formData.image;

    if (selectedImage) {
      imagePath = await uploadImage(); // Upload image and get new path
      // Optionally update formData.image here too:
      setFormData(prev => ({ ...prev, image: imagePath }));
    }

    // Prepare the updated user data to send
    const userData = {
      _id: id,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      image: imagePath,
    };

    if (formData.password) {
      userData.password = formData.password; // Only include password if entered
    }
     alert(JSON.stringify(userData))
    // Dispatch updateUsers with the updated data
    const updatedUser = await dispatch(updateUsers(id, userData));

 
    // Update local user list with the updated user info
    // setUsers((prevUsers) =>
    //   prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    // );
navigate('/users')
    // Reset form and UI states
    setEditingUser(null);
    setSelectedImage(null);
    setPreview(null);
    setFormSuccess('User updated successfully');
  } catch (err) {
    // Handle error (e.g., setError(err.message))
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill out all required fields');
      return;
    }

    let imagePath = '';
    if (selectedImage) {
      imagePath = await uploadImage();

    }


    const newUserData = { ...formData, image: imagePath };
    console.log(newUserData)
    await dispatch(createUsers(newUserData));
    navigate('/users')

  };




 

  const [preview, setPreview] = useState(null);







  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', image: '', role: 'user' });
    setFile(null);
    setPreview(null);
  }

  return (

    <div className=' flex min-h-screen sm:min-w-full '>
      <div className=' w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen'>
        <div className={`flex flex-col gap-6  sm:p-10 pb-6 overflow-hidden `}>
          {/* <p>user id: {id}</p> */}
          <h2 className='border-b pb-3 border-gray-300 text-xl font-semibold capitalize flex items-center '> {id ? ("Edit User") : ("Add User")}  </h2>
          <div id='refistration-form' className={`  px-[1px] w-3/5  `}>
            <form onSubmit={id ? (updateUser) : (handleSubmit)} className='flex flex-col ' >
              <p className='mb-[16px]'>
                <label htmlFor="name" className='text-[14px] mb-[5px]'>
                  Username <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className='border rounded-[3px] border-[#ddd] py-[8px] px-[15px] w-full'
                  required
                />
              </p>
              <p className='mb-[16px]'>
                <label htmlFor="email" className='text-[14px] mb-[5px]'>
                  Email address <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className='border rounded-[2px] border-[#ddd] py-[8px] px-[15px] w-full'
                  required
                />
              </p>
              {id ? (<p className='mb-[16px]'>
                <label htmlFor="password" className='text-[14px] mb-[5px]'>
                  Password <span className="required" aria-hidden="true"></span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className='border rounded-[2px] border-[#ddd] py-[8px] px-[15px] w-full'

                />
              </p>) : (<p className='mb-[16px]'>
                <label htmlFor="password" className='text-[14px] mb-[5px]'>
                  Password <span className="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className='border rounded-[2px] border-[#ddd] py-[8px] px-[15px] w-full'
                  required
                />
              </p>)}


              <p className='mb-[16px]'>
                <label htmlFor="role" className='text-[14px] mb-[5px]'>Role</label>
                <select
                  name="role"
                  className='border rounded-[2px] border-[#ddd] py-[8px] px-[15px] w-full'
                  value={formData.role || 'user'}
                  onChange={handleInputChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

              </p>
              <p className=' flex gap-[16px] flex-col'>
                <label className=" font-medium border-[#ddd] text-center cursor-pointer text-black w-max py-2 px-5 shadow hover:shadow-lg false mb-[5px] ">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled=""
                  />
                  Choose File

                </label>

                <img src={preview} width={100} />
              </p>
              <button
                type="submit"
                className='w-fit hover:opacity-[0.8] border border-[#ee403d] mt-[16px] text-white bg-[#ee403d] py-[8px] px-[15px]  rounded-[2px] register-btn'
              >
                {id ? ("Update") : ("Add User")}
              </button>

            </form>
            {error && <div className="text-primary-red mb-[16px] p-[16px] border border-[#ddd] text-[14px] ">{error}</div>}
            {formSuccess && (


              <span className='mb-[16px] p-[16px] border border-[#ddd] text-[14px] flex text-success'>{formSuccess}</span>

            )}

            <div className=' flex gap-2'>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default UserLogin;




