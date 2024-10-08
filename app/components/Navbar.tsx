import Image from "next/image";
import React from "react";
import profile from "../public/alex.jpg";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="bg-blue-700 py-2 px-4 ">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          {" "}
          EXAM
        </Link>
        <Link
          href="/postQuestion"
          className="bg-white text-blue-700 px-4 py-2 rounded-md font-bold"
        >
          Add Question
        </Link>
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
