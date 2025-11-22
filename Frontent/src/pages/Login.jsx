import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../main";
import { useDispatch} from "react-redux";
import { setUserData } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // use redux se se data find
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const result = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setPassword("");
      setEmail("");
      setLoading(false);
      setError("");
      // navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-300">
      <div className="w-full max-w-[400px] h-[500px] bg-white flex flex-col items-center gap-4 rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full h-[180px] bg-[#087df1] rounded-b-[30%] flex justify-center items-center text-gray-800 text-2xl ">
          Login to <span className="font-bold text-white pl-1">MeloChat</span>
        </div>
        <form className="w-[80%] flex flex-col gap-3" onSubmit={handleSubmit}>
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              placeholder="Password"
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
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p
          className="text-gray-600"
          onClick={() => {
            navigate("/signup");
          }}
        >
          You want to create a new account?{" "}
          <span className="text-[#087df1] font-semibold cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
