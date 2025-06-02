import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import './user.css'

function UserLogin() {
  // Register


  const [editingUser, setEditingUser] = useState(null);  // State to track the user being edited
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', image: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [formSuccess, setFormSuccess] = useState("");
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState();


  const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'  // or whatever your local API URL is
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
    if (!id) return;

    const fetchUser = async () => {
     
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/get-user/${id}`);
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();

        setFormData({
          name: data.name || '',
          email: data.email || '',
          password: '',
          role: data.role || 'user',
          image: data.image || '',
        });

        setEditingUser(data);

        if (data.image) {
          setPreview(`${baseUrl}${data.image}`);
        }
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);



  const uploadImage = async () => {
    if (!selectedImage) return '';
    const data = new FormData();
    data.append('image', selectedImage);

    const res = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      body: data,
    });

    const json = await res.json();
    if (res.ok) return json.filePath;
    else throw new Error(json.msg || 'Image upload failed');
  };


  // uodateUser
  const updateUser = async (e) => {
    e.preventDefault();
    if (!id) {
      alert("No user is being edited.");
      return;
    }

    try {
      let imagePath = formData.image;

      if (selectedImage) {
        imagePath = await uploadImage();
      }

      // Prepare payload: send password only if not empty
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
      // alert(JSON.stringify(userData));
      const response = await fetch(`${baseUrl}/api/editUser/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to update user. Status: ${response.status}`);
      }

      const updatedUser = responseBody;

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );

      // setFormData({ name: '', email: '', role: 'user', password: '', image: '' });
      navigate('/users')
      setEditingUser(null);
      setSelectedImage(null);
      setPreview(null);
      setFormSuccess('User updated successfully');
      
    } catch (err) {
      setError(err.message);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill out all required fields');
      return;
    }


    setLoading(true);
    setError('');
    setFormSuccess('');

    try {
      // 1. Upload image first (if any)
      let imagePath = '';
      if (selectedImage) {
        imagePath = await uploadImage();

      }

      // 2. Register user with image path
      const response = await fetch(`${baseUrl}/api/register-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: imagePath }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Failed to register user');
      } else {
        setFormSuccess('User registered successfully');
        navigate('/users')
        // setFormData({ name: '', email: '', password: '', role: 'user' });
        setSelectedImage(null);
        setPreview(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  //  



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
            <form onSubmit={id ? (updateUser) : (handleSubmit)}  className='flex flex-col ' >
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