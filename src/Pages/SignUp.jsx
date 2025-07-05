import { SignUpForm } from "../components/signup-form";
function SignUp() {
   return (
     <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-white dark:bg-gray-950">
       <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 w-full max-w-6xl">
         <div className="w-full md:w-1/2">
           <SignUpForm />
         </div>

         <div className="hidden md:flex mb-6 w-full md:w-1/2 justify-center">
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

export default SignUp
