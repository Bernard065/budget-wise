import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderLogo = () => {
  return (
    <Link href="/" className="items-center hidden lg:flex">
      <Image
        src="/images/banking.png"
        width={35}
        height={35}
        alt="logo"
        className="invert-colors"
      />
      <p className="font-semibold text-white text-2xl ml-3">BudgetWise</p>
    </Link>
  );
};

export default HeaderLogo;
