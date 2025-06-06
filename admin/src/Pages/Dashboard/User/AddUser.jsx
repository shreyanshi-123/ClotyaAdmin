import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { createUsers, imageUpload, updateUsers, getUserById } from '../../../Actions/userAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faImage } from '@fortawesome/free-solid-svg-icons';

import './user.css'

function AddOrEditUser() {

  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', image: '', role: 'user' });
  const [formSuccess, setFormSuccess] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(state => state.loginAdmin.isLoggedIn);
  const { users = [], loading, error } = useSelector(state => state.newUser);

  const { user, } = useSelector(state => state.userDetail);
  const { image } = useSelector(state => state.imageUser);

  const { id } = useParams();

  const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : process.env.REACT_APP_API_URL;
  const imageUrl = user?.image ? `${baseUrl}${user.image}` : null;


  const goBack = () => {
    navigate(-1);
  };

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


  useEffect(() => {
    if (id) {

      dispatch(getUserById(id));

    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!id) return;

    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || '',
      image: user?.image || '',
    });



    if (user?.image) {
      setPreview(`${baseUrl}${user.image}`);
    } else {
      setPreview(null);
    }

  }, [user, id]);


  useEffect(() => {
    return () => {
      if (!id) return;
      if (preview) URL.revokeObjectURL(preview);
    }
  }, [preview]);


  const uploadImage = async () => {
    if (!selectedImage) return formData.image || '';

    const data = new FormData();
    data.append('image', selectedImage);

    try {
      const response = await dispatch(imageUpload(data));
      return response.filePath || response.imagePath || formData.image || '';
    } catch (error) {
      alert('Image upload failed: ' + error.message);
      return '';
    }
  };




  const updateUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!id) {
      alert("No user is being edited.");
      return;
    }

    try {
      let imagePath = formData.image;

      if (selectedImage) {
        imagePath = await uploadImage();
      }


      const userData = {
        _id: id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        image: imagePath,
      };

      if (formData.password) {
        userData.password = formData.password;
      }


      await dispatch(updateUsers(id, userData));

      setTimeout(() => {
        setIsSubmitting(true);
        navigate('/users')
      }, 1000);

      setEditingUser(null);
      setSelectedImage(null);
      setPreview(null);
      setFormSuccess('User updated successfully');
    } catch (err) {
      setIsSubmitting(false);
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   alert(JSON.stringify(users))
  //   if (!formData.name || !formData.email || !formData.password) {
  //     alert('Please fill out all required fields');
  //     return;
  //   }

  //   let imagePath = '';
  //   if (selectedImage) {
  //     imagePath = await uploadImage();

  //   }


  //   const newUserData = { ...formData, image: imagePath };
  //   console.log(newUserData)
  //   try {

  //     await dispatch(createUsers(newUserData));


  //     if (users) {
  //       // setTimeout(() => {
  //       setIsSubmitting(true);
  //       navigate('/users')
  //       // }, 1000);
  //     } else {
  //       setIsSubmitting(false);
  //       return
  //     }


  //   } catch (error) {
  //     console.error('Submission failed', error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
 const handleSubmit = async (e) => {
  e.preventDefault();

    setIsSubmitting(true);

  

  if (!formData.name || !formData.email || !formData.password) {
    alert('Please fill out all required fields');
    setIsSubmitting(false);
    return;
  }

  let imagePath = '';
  if (selectedImage) {
    imagePath = await uploadImage();
  }

  const newUserData = { ...formData, image: imagePath };
  console.log(newUserData);

  try {
    await dispatch(createUsers(newUserData));
    setIsSubmitting(false);
    // Don't navigate here — wait for useEffect to handle it
  } catch (error) {
    console.error('Submission failed', error);
    alert('Submission failed: ' + error.message);
    setIsSubmitting(false);
  }
};



  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', image: '', role: 'user' });
    setFile(null);
    setPreview(null);
  }

  return (

    <div className=' flex min-h-screen sm:min-w-full '>
      <div className=' w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen'>
        {/* <button onClick={goBack}>Go Back</button> */}
        <div className={`flex flex-col gap-6  sm:p-10 pb-6 overflow-hidden `}>
          {/* <p>user id: {id}</p> */}

          <div className='border-b pb-[12px] border-gray-300 flex justify-between items-center'>
            <h2 className='text-xl font-semibold capitalize flex items-center'>
              {id ? ("Edit User") : ("Add User")}
            </h2>

            <button onClick={goBack} className='w-fit hover:opacity-[0.8] border border-[#ee403d]  text-white bg-[#ee403d] py-[8px] px-[15px]  rounded-[2px]'>
              <FontAwesomeIcon icon={faAnglesLeft} />  Go Back
            </button>


          </div>
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
              <div className="my-[16px] flex flex-col ">
                <div className="w-full border border-gray-300 border-b-0  px-3 py-2 flex items-center justify-center h-[140px] p-4">
                  {preview ? (

                    <img
                      src={preview}
                      alt="Category Preview"
                      width={100}
                      className="mt-[16px] rounded"
                    />

                  ) : (<FontAwesomeIcon icon={faImage} />)}
                </div>
                <label className=" font-medium border border-[#ddd] text-center cursor-pointer text-black  py-2 px-5  hover: false mb-[5px] img-box w-ful bg-gray-200 hover:bg-gray-600 hover:text-white">User Image
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={loading}
                  /></label>

              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className='w-fit hover:opacity-[0.8] border border-[#ee403d] mt-[16px] text-white bg-[#ee403d] py-[8px] px-[15px]  rounded-[2px] register-btn'
                style={isSubmitting ?
                  styles.disabledButton : styles.enabled}
              >
                {isSubmitting ? 'Processing....' : id ? 'Update' : 'Add User'}
              </button>

            </form>
            {error && <div className="text-primary-red my-[16px] p-[16px] border border-[#ddd] text-[14px] ">{error}</div>}
            {formSuccess && (


              <span className='my-[16px] p-[16px] border border-[#ddd] text-[14px] flex text-success'>{formSuccess}</span>

            )}

            {/* <div className=' flex gap-2'>
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
            </div> */}
          </div>
        </div>
      </div>
    </div >
  );
}


export default AddOrEditUser;




