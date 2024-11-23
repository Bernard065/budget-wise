"use client";

import React from "react";
import { useMountedState } from "react-use";

import AccountSheet from "@/components/forms/AccountSheet";
import CategorySheet from "@/components/forms/CategorySheet";
import UpdateAccountSheet from "@/components/forms/UpdateAccountSheet";
import UpdateCategorySheet from "@/components/forms/UpdateCategorySheet";
import TransactionSheet from "@/components/forms/TransactionSheet";
import UpdateTransactionSheet from "@/components/forms/UpdateTransactionSheet";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <AccountSheet />
      <UpdateAccountSheet />

      <CategorySheet />
      <UpdateCategorySheet />

      <TransactionSheet />
      <UpdateTransactionSheet />
    </>
  );
};

export default SheetProvider;
