
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import http from "../util/http";
import { ToastContainer, toast } from 'react-toastify';


const Signup = () =>{
    const navigate =useNavigate()
    const [type,setType] = useState('password')

   const model = {
        fullname:'',
        email:'',
        password:'',
   }
   
   const [signupForm,setSignupForm] = useState(model)
   const handleSignupForm=(e)=>{
     const input = e.target
     const name = input.name
     const value = input.value
     const x = {
        ...signupForm,
        [name]:value
     }
     setSignupForm(x)
   }
  const signup = async (e) => {
    try {
         e.preventDefault();
         const {data}=await http.post('/auth/signup',signupForm)
         navigate('/admin/login')
    } catch (error) {
        toast.error("Signup error:", error.response?.data || error.message,{ position: 'top-center'});
        console.log(error.message)
    }
};

 return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center nimate__animated animate__fadeIn ">
        <div className="bg-white w-[480px] rounded shadow p-5 animate__animated animate__pulse" >
            <h1 className="text-center text-2xl font-semibold mb-4">Hi Admin!</h1>
       
            <form action="" className="flex flex-col gap-5" onSubmit={(e)=>signup(e)}>
                   <div className="flex flex-col gap-2">
                        <label className="font-medium text-base">fullname</label>
                        <input 
                        onChange={handleSignupForm}
                        className="border  border-gray-300 rounded p-2"
                        name="fullname"
                        type="text" placeholder="mail@gmail.com" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-base">email</label>
                        <input 
                        onChange={handleSignupForm}
                        className="border  border-gray-300 rounded p-2"
                        name="email"
                        type="email" placeholder="mail@gmail.com" />
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        <label className="font-medium text-base">password</label>
                        <input 
                        onChange={handleSignupForm}
                        className="border  border-gray-300 rounded p-2 pr-12"
                        name="password"
                        type={type} placeholder="******" />

                        <button

                        onClick={()=>setType(type ==='password'?'text':'password')}
                        type="button"
                        className="absolute top-9 right-2 bg-gray-100 w-8 h-8 rounded-full hover:bg-gray-200">
                           {
                            type==='password'? <i className="ri-eye-line"></i> :<i className="ri-eye-off-line"></i>
                           }
                        </button>
                    </div>

                    

                    <button className="bg-indigo-500  p-2 rounded font-medium text-white">Signup</button>
                 </form>

                 <div className="flex gap-2 mt-4 ">
                  <label className="text-gray-500 " >I have an account?</label>
                 <Link to="/admin/login" className="text-blue-600 hover:underline">SignIn</Link>
                 </div>
              </div>
        </div> 
    )
}
export default Signup