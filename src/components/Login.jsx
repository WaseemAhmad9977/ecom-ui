import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { mutate } from "swr";
import http from "../util/http";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri"; // React Icons import

axios.defaults.withCredentials = true;

const Login = () => {
  const [type, setType] = useState("password");
  const model = {
    email: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(model);
  const navigate = useNavigate();

  const handleLoginForm = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    const x = {
      ...loginForm,
      [name]: value,
    };
    setLoginForm(x);
  };

  const handlelogin = async (e) => {
    try {
      e.preventDefault();

      const { data } = await http.post(
        "auth/login",
        loginForm
      );

      if (data.role === "admin") {
        mutate("/user/session", data, false);
        navigate("/admin/dashboard");
        return;
      }

      navigate("/");
    } catch (err) {
      console.log(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center animate__animated animate__fadeIn">
      <div className="bg-white w-[480px] rounded shadow p-5 animate__animated animate__pulse">
        <h1 className="text-center text-2xl font-semibold mb-4">Hi Admin!</h1>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => handlelogin(e)}
        >
          <div className="flex flex-col gap-2">
            <label className="font-medium text-base">email</label>
            <input
              onChange={handleLoginForm}
              className="border border-gray-300 rounded p-2"
              name="email"
              type="email"
              placeholder="mail@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="font-medium text-base">password</label>
            <input
              onChange={handleLoginForm}
              className="border border-gray-300 rounded p-2 pr-12"
              name="password"
              type={type}
              placeholder="******"
            />

            <button
              onClick={() => setType(type === "password" ? "text" : "password")}
              type="button"
              className="absolute top-9 right-2 bg-gray-100 w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center"
            >
              {type === "password" ? (
                <RiEyeLine />
              ) : (
                <RiEyeOffLine />
              )}
            </button>
          </div>
          <button className="bg-indigo-500 p-2 rounded font-medium text-white">
            login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
