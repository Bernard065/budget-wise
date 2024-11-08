"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";

const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome{isLoaded ? ", " : ""}
        {user?.firstName}
      </h2>

      <p className="text-sm lg:text-base text-[hsl(217,97%,76%)]">
        This is your Financial OverView Report
      </p>
    </div>
  );
};

export default WelcomeMsg;
