import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <nav className="flex-between bg-light-900 fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/images/banking.png" width={23} height={23} alt="logo" />

        <p className="h2-bold text-dark-100 max-sm:hidden">
          Budget<span className="text-primary-500">Wise</span>
        </p>
      </Link>

      <MobileNavbar />
    </nav>
  );
};

export default Navbar;
