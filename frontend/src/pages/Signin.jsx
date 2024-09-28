import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = () => {
    axios.post("http://localhost:3000/api/v1/user/signin", {
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
      // You might want to add some user feedback here, e.g., setting an error state
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-300">
      <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
        
        <div className="text-center">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
        </div>

        <div className="space-y-3 mt-4">
          <InputBox 
            label={"Email"} 
            placeholder={"example@domain.com"} 
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox 
            label={"Password"} 
            placeholder={"********"} 
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="mt-4">
          <Button 
            label={"Sign in"} 
            onClick={handleSignin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          />
        </div>
        <BottomWarning 
          label="Don't have an account?" 
          buttonText="Sign up" 
          to="/signup"
        />
        
      </div>
    </div>
  );
}