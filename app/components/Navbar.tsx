import Image from "next/image";
import React from "react";
import profile from "../public/alex.jpg";

const Navbar: React.FC = () => {
  return (
    <div className="bg-blue-700 py-2 px-4 ">
      <div className="flex justify-between items-center">
        <p className="text-white font-bold text-xl"> EXAM PRACTICE</p>
        {/* <Image
          src={profile}
          alt="profile"
          width={50}
          height={50}
          className="rounded-full"
        /> */}
      </div>
    </div>
  );
};

export default Navbar;
