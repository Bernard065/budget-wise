"use client";
 
import AccountSheet from "@/components/forms/AccountSheet";
import React from "react";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <AccountSheet />
    </>
  );
};

export default SheetProvider;
