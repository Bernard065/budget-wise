"use client";

import AccountSheet from "@/components/forms/AccountSheet";
import UpdateAccountSheet from "@/components/forms/UpdateAccountSheet";
import React from "react";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <AccountSheet />
      <UpdateAccountSheet />
    </>
  );
};

export default SheetProvider;
