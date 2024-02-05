"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Userbutton from "@/components//userButton";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex w-screen justify-center">
      <ul className="flex w-1/2 justify-around">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        {status === "authenticated" ? (
          <li>
            <Userbutton user={session.user} />
          </li>
        ) : (
          <li>
            <Link href="/auth/signin">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
