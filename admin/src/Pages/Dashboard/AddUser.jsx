import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import './user.css'

function UserLogin() {
    // Register



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({ name: '', email: '', password: '', profileImage: '', role: '' });
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [formSuccess, setFormSuccess] = useState("");
    const navigate = useNavigate();

const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState();
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


    const AddUser = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            alert('Please fill out all fields');
            return;
        }

        setLoading(true);
        setError('');
        setFormSuccess('');

        try {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('email', formData.email);
            form.append('password', formData.password);
            form.append('role', formData.role || 'user');
            form.append('profileImage', selectedImage);

            const response = await fetch('http://localhost:5000/api/upload', {
              
                method: 'POST',
                body: form, // no content-type header!
                //  headers: { "Content-Type": "multipart/form-data" },
            });


            if (!response.ok) {
                alert('error')
                const errorText = await response.text();
                setError(errorText || 'Failed to register user');
            } else {
               
                setFormSuccess('User Added successfully');
                setFormData({ name: '', email: '', password: '', profileImage: '', role: '' });
                setFile(null);
                setPreview(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


   
    const [preview, setPreview] = useState(null);

   

    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //         setFile(selectedFile);
    //         setPreview(URL.createObjectURL(selectedFile));
    //     }
    // };
    


    const resetForm = () => {
        setFormData({ name: '', email: '', password: '', profileImage: '', role: 'user' });
        setFile(null);
        setPreview(null);
        setError('');
        setFormSuccess('');
    };



    return (

        <div className=' flex min-h-screen sm:min-w-full '>
            <div className=' w-full lg:w-3/4 xl:w-4/5 lg:ml-auto min-h-screen'>
                <div className={`flex flex-col gap-6  sm:p-10 pb-6 overflow-hidden `}>

                    <h2 className='border-b pb-3 border-gray-300 text-xl font-semibold capitalize flex items-center '>Add User</h2>
                    <div id='refistration-form' className={`  px-[1px] w-3/5  `}>
                        <form onSubmit={AddUser} className='flex flex-col '>
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
                            <p className='mb-[16px]'>
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
                            </p>
                            <p className='mb-[16px]'>
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
                                        name="profileImage"
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
                                Register
                            </button>

                        </form>
                        {error && <div className="text-primary-red mb-[16px] p-[16px] border border-[#ddd] text-[14px] ">{error}</div>}
                        {formSuccess && (


                            <span className='mb-[16px] p-[16px] border border-[#ddd] text-[14px] flex text-success'>{formSuccess}</span>

                        )}

                        <div className='justify-center flex gap-2'>
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
