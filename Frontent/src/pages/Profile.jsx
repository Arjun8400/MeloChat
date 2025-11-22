import React from "react";
import dp from "../assets/dp.avif";
import { IoCamera } from "react-icons/io5";
import { useSelector } from "react-redux";

const Profile = () => {
  const {userData} = useSelector(state=>state.user);

  return (
    <div className="w-full h-screen bg-slate-300 flex flex-col justify-center items-center  gap-[20px]">
      <div className="w-[150px] h-[150px] rounded-full bg-white border-2 border-[#56a8fa] shadow-gray-500 shadow-lg relative ">
        <div>
          <img
            src={dp}
            alt="DP Image"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <IoCamera className="absolute bottom-4 right-4 text-white bg-blue-500 text-lg p-[2px] rounded-full cursor-pointer" />
      </div>

      <form
        action=""
        className="w-[400px] mx-w-[500px] flex flex-col gap-[20px] items-center justify-center"
      >
        <input
          type="text"
          name=""
          id=""
          
          placeholder="Enter your name"
          className="w-[90%] h-[50px] border-2 border-[#39c1ee] px-[20px] py-[10px] bg-white rounded-lg"
        />
        <input
          type="text"
          name=""
          id=""
          readOnly
          value={userData.user.userName}
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg"
        />
        <input
          type="text"
          name=""
          id=""
          readOnly
          value={userData.user.email}
          className="w-[90%] h-[50px] border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-800 w-[90%] py-2 rounded-xl text-white font-semibold">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
