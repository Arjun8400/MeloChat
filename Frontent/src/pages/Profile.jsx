import React, { useRef, useState } from "react";
import dp from "../assets/dp.avif";
import { IoCamera } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios'
import { API_URL } from "../main";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [name, setName] = useState(userData.user.name || "");
  const [frontendImage, setFrontendImage] = useState(userData.user.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false)

  const image = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      if(backendImage){
        formData.append("image", backendImage)        
      }
      const result = await axios.put(`${API_URL}/user/profile`,formData,{withCredentials:true,headers: {
        "Content-Type": "multipart/form-data"
    }})
      setSaving(false)
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
      setSaving(false)
    }
  };

  return (
    <div className="w-full h-screen bg-slate-300 flex flex-col justify-center items-center  gap-[20px]">
      <div
        className="fixed top-5 left-6 text-blue-600 hover:text-blue-800 cursor-pointer py-2 px-4 text-xl"
        onClick={() => {
          navigate("/");
        }}
      >
        <FaArrowLeft />
      </div>
      <div
        className="w-[150px] h-[150px] rounded-full bg-white border-2 border-[#56a8fa] shadow-gray-500 shadow-lg relative cursor-pointer flex justify-center items-center overflow-hidden"
        onClick={() => {
          image.current.click();
        }}
      >
        <div>
          <input
            type="file"
            hidden
            accept="image/*"
            ref={image}
            onChange={handleChange}
          />
          <img
            src={frontendImage}
            alt="DP Image"
            className="h-full w-full object-cover "
          />
        </div>
        <IoCamera className="absolute bottom-4 right-4 text-white bg-blue-500 text-lg p-[2px] rounded-full cursor-pointer" />
      </div>

      <form
        action=""
        onSubmit={handleProfile}
        className="w-[400px] mx-w-[500px] flex flex-col gap-[20px] items-center justify-center"
      >
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          placeholder="Enter your name"
          className="w-[90%] h-[50px] border-2 border-[#39c1ee] px-[20px] py-[10px] bg-white rounded-lg"
        />
        <input
          type="text"
          name=""
          id=""
          readOnly
          value={userData.user.userName}
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg text-gray-400"
        />
        <input
          type="text"
          name=""
          id=""
          readOnly
          value={userData.user.email}
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg text-gray-400"
        />
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-500 hover:bg-blue-800 w-[90%] py-2 rounded-xl text-white font-semibold"
        >
          {saving? "Saving...":"Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
