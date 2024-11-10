'use client'

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/hooks/use-new-accounts";
import React from "react";

const Home = () => {
  const { onOpen } = useNewAccount();

  return (
    <div>
      <Button onClick={onOpen}>Add account</Button>
    </div>
  );
};

export default Home;
