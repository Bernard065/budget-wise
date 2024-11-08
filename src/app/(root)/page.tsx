import { UserButton } from "@clerk/nextjs";
import React from "react";

const Home = async () => {
  return <UserButton afterSignOutUrl="/" />;
};

export default Home;
