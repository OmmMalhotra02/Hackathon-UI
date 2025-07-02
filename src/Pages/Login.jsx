import React from "react";
import { LoginForm } from "../components/login-form";

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-white dark:bg-gray-950">
      {/* Optional Logo */}
      {/* <div className="mb-8">
        <img src="./src/assets/UBS-logo.png" alt="UBS Logo" className="w-32 mx-auto" />
      </div> */}

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 w-full max-w-6xl">
        <div className="w-full md:w-1/2">
          <LoginForm />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="./src/assets/keys.png"
            alt="Security Illustration"
            className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
