"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  console.log("Session: ", session);
  return (
    <nav className="flex w-screen justify-center">
      <ul className="flex w-1/2 justify-around">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="api/auth/signin">Sign in</Link>
        </li>
        <li>
          <Button asChild>
            <Link href="/api/auth/signout">Sign out</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
