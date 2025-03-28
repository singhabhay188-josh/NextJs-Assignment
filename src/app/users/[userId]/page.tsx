import Link from "next/link";
import React from "react";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";


const page = () => {
  //   Avatar
  // Link to the Github Page
  // Username
  // Following/Followers
  
  // Email
  // Location
  // Bio
  // Blog

  return <div className="min-h-screen bg-black flex justify-center items-center">

    <div className="shadow-lg w-[90%] max-w-[600px] p-6 pt-12 rounded-lg bg-slate-200 flex flex-col items-center justify-center gap-8">

      <div className="w-full flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-32">
        <div className="rounded-full h-32 w-32 border border-black overflow-hidden">
          <img src="https://gravatar.com/avatar/b4df9a9fab43632fce292798a41f9b8d?s=400&d=robohash&r=x" alt="Avatar" />
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">Abhay Singh</h1>
          <p className="text-sm max-sm:text-center">@ myusername</p>
        </div>

      </div>


      <div className="w-full flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-gray-700">
            <MdEmail className="text-blue-500" />
            <p>abhay@gmail.com</p>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FaLocationArrow className="text-green-500" />
            <p>Delhi, India</p>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FaUser className="text-orange-500" />
            <p>Want to View My Profile <Link href="https://www.google.co.in/" className="text-blue-500 hover:underline">Open</Link></p>
          </div>
        </div>

        <div className="flex justify-between w-full text-gray-700">
          <p className="text-2xl font-semibold">
            <span className="text-blue-500">14</span> Followers
          </p>
          <p className="text-2xl font-semibold">
            <span className="text-blue-500">17</span> Following
          </p>
        </div>

    </div>



  </div>;
};

export default page;
