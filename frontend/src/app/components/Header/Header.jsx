"use client";
import React, { useState } from "react";
import Link from "next/link";

import { useSelector } from "react-redux";
import Image from "next/image";
import Spinner from "../Spinner";
import UserFilter from "./UserFilter";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);

  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <div className="sticky z-50 top-0 flex items-center justify-center backdrop-blur-sm px-5 py-2 text-sm md:px-12">
        {/* <div>
          <Link href={"/"}>Vishal's Blog</Link>
        </div> */}

        <div className="relative md:w-[75%] flex flex-col justify-center items-center">
          <UserFilter />
        </div>
        
        {/* <div>
          {user ? (
            <div className="relative">
              {loading && <Spinner width={50} height={50} />}
              {!loading && (
                <Image
                  onClick={(e) => {
                    setDropDown(!dropDown);
                  }}
                  className="size-[40px] object-cover object-center rounded-full cursor-pointer"
                  src={user.avatarImage}
                  width={30}
                  height={30}
                />
              )}
              <div
                className={`absolute flex flex-col rounded-md bg-white left-[50%] -translate-x-1/2 p-0 overflow-hidden transition-all w-0 h-0 ease-out ${dropDown && "h-[85px] w-[140px] p-2"}`}
              >
                <Link className=" cursor-pointer" href={`/user/${user._id}`}>
                  Profile
                </Link>
                <Link className=" cursor-pointer" href={"/blog/create"}>
                  Create Blog
                </Link>
                <Link className=" cursor-pointer" href={"/"}>
                  Help & Support
                </Link>
              </div>
            </div>
          ) : (
            <div className="transition ease-in-out px-2 py-[2px] text-sm rounded-sm cursor-pointer hover:bg-black hover:text-white">
              <Link className="text-sm" href={"/user/signup"}>
                Sign Up
              </Link>
            </div>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Header;
