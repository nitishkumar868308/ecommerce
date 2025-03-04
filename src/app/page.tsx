// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Loader from "@/components/shared/Loader";

// const loginSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export default function LoginPage() {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//     mode: "onTouched",
//     reValidateMode: "onBlur",
//   });

//   const onSubmit = async (data: any) => {
//     try {
//       setIsSubmitting(true);
//       setErrorMessage("");
//       console.log("Logging in with:", data);

//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       alert("Login Successful!");
//     } catch (error) {
//       setErrorMessage("Login failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-gray-100">
//       {isSubmitting && <Loader />}
//       <div className="w-full max-w-sm md:max-w-md p-6 sm:p-8 overflow-auto">
//         <Card className="p-6 sm:p-8 w-full bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl border border-gray-300">
//           <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900">Login</h2>

//           {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Email</label>
//               <Input
//                 type="email"
//                 {...register("email")}
//                 placeholder="Enter your email"
//                 className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700">Password</label>
//               <Input
//                 type="password"
//                 {...register("password")}
//                 placeholder="Enter your password"
//                 className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//               {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
//             </div>

//             <Button
//               type="submit"
//               className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Logging in..." : "Login"}
//             </Button>
//           </form>

//           <p className="text-center text-gray-600 text-sm mt-4">
//             Don&apos;t have an account?{" "}
//             <a href="#" className="text-blue-500 font-semibold hover:underline">
//               Sign Up
//             </a>
//           </p>
//         </Card>
//       </div>
//     </div>
//   );
// }


// import React from 'react'
// import LoginPage from './pages/login'
// // import RegisterPage from './pages/register'



// const page = () => {
//   return (
//     <div>
//       <LoginPage />
//     </div>
//   )
// }

// export default page


import React from 'react'
import Header from '@/components/layout/header'
import Slider from '@/components/Home/Slider'
import Product from '@/components/Home/Product'
import Footer from '@/components/layout/footer'

const page = () => {
  return (
    <>
      <Header />
      <Slider />
      <Product />
      <Footer />
    </>
  )
}

export default page
