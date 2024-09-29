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
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/dashboard");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials. Please try again.");
      } else if (err.request) {
        setError("No response from server. Please check your internet connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-200 via-purple-300 to-purple-200 p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-purple-500/50 border border-white border-opacity-30">
        <div className="p-8">
          <div className="text-center mb-8">
            <Heading label={"Welcome Back"} className="text-white text-3xl font-bold mb-2" />
            <SubHeading label={"Sign in to your account"} className="text-purple-100" />
          </div>

          <div className="space-y-6">
            <InputBox 
              label={"Email"} 
              placeholder={"example@domain.com"} 
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white bg-opacity-20 border-0 text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-400"
            />
            <InputBox 
              label={"Password"} 
              placeholder={"********"} 
              type="password" 
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white bg-opacity-20 border-0 text-white placeholder-purple-200 focus:ring-2 focus:ring-purple-400"
            />
          </div>
          
          {error && (
            <div className="mt-4 bg-red-400 bg-opacity-20 border border-red-400 text-white px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-8">
            <Button 
              label={isLoading ? "Signing in..." : "Sign in"} 
              onClick={handleSignin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-100"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="bg-white bg-opacity-30 p-4">
          <BottomWarning 
            label="Don't have an account?" 
            buttonText="Sign up" 
            to="/signup"
            className="text-purple-100 hover:text-white transition-colors duration-300"
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-purple-100 rounded-full opacity-10 animate-pulse animation-delay-1000"></div>
      </div>
    </div>
  );
}