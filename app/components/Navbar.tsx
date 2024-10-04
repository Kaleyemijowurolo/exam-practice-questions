import Image from "next/image";
import React from "react";
import profile from "../public/alex.jpg";

const Navbar: React.FC = () => {
  return (
    <div className="bg-blue-700 py-2 px-4 ">
      <div className="flex justify-between items-center">
        <p className="text-white font-bold text-xl"> EXAM</p>
        <Image
          src={profile}
          alt="profile"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
