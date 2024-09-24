import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { BottomWarning } from "../components/BottomWarning"

export const Signin = () => {
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-300">
      <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
        
        {/* Center the heading and subheading */}
        <div className="text-center">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your Credentials to acces your account"} />
        </div>

        <div className="space-y-3 mt-4">
          <InputBox label={"Email"} placeholder={"example@domain.com"} onChange={()=>{console.log("function called")}}/>
          <InputBox label={"Password"} placeholder={"********"} type="password" onChange={()=>{console.log("function called")}}/>
        </div>
        
        {/* Button with full width */}
        <div className=" mt-4">
          <Button label={"Sign in"} onClick={()=>console.log("function called")} />
        </div>
        <BottomWarning 
          label="Do not have an account?" 
          buttonText="Sign up" 
          to="/signup"
        />
        
      </div>
    </div>
  );
}
