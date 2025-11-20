import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../main.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // !redux se
  const dispatch = useDispatch();

  // ! api call form submit per
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const result = await axios.post(
        `${API_URL}/create`,
        {
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data)); //! store me data save krna redux me data ko dalna
      setUserName("");
      setEmail("");
      setPassword("");
      navigate("/login");
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-300">
      <div className="w-full max-w-[400px] h-[500px] bg-white flex flex-col items-center gap-4 rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full h-[180px] bg-[#087df1] rounded-b-[30%] flex justify-center items-center text-gray-800 text-2xl ">
          welcome to <span className="font-bold text-white pl-1">MeloChat</span>
        </div>
        <form className="w-[80%] flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#087df1]"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#087df1]"
          />
          <div className=" w-full border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#087df1] relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="w-full p-3 focus:outline-none focus:border-[#087df1]"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer font-semibold text-[#087df1]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-[#087df1] text-white rounded-lg hover:bg-[#065bb5] transition-colors"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <p
          className="text-gray-600"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an account?{" "}
          <span className="text-[#087df1] font-semibold cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
