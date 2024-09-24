import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {

  const [firstName,setfirstName] = useState("");
  const [lastName,setlastName] = useState("");
  const [username,setusername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();


  const handleSignup = () => {
    axios.post("http://localhost:3000/api/v1/user/signup", {
      firstName,
      lastName,
      username,
      password,
    })
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    })
    .catch((err) => {
      console.error("Error:", err);
    });
  };
  
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-slate-300">
      <div className="bg-white  text-black p-8 rounded-lg shadow-md w-full max-w-md">
        
        {/* Center the heading and subheading */}
        <div className="text-center">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
        </div>

        <div className="space-y-4 mt-4">
          <InputBox label={"First Name"} placeholder={"Abhishek"} onChange={e => {
            setfirstName(e.target.value);
          }}/>
          <InputBox label={"Last Name"} placeholder={"Kumar"} onChange={(e) => {
            setlastName(e.target.value);
          }}/>
          <InputBox label={"Email"} placeholder={"example@domain.com"} onChange={(e) => {
            setusername(e.target.value);
          }}/>
          <InputBox label={"Password"} placeholder={"********"} type="password" onChange={(e) => {
            setPassword(e.target.value);
          }}/>
        </div>
        
        {/* Button with full width */}
        <div className="mt-6">
          <Button 
            label={"Sign up"} 
            onClick={handleSignup}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          />
        </div>

        {/* BottomWarning Component */}
        <BottomWarning 
          label="Already have an account?" 
          buttonText="Sign in" 
          to="/signin"
        />
      </div>
    </div>
  );
}


