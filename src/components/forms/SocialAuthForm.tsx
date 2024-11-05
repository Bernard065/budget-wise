"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/webauthn";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, { callbackUrl: ROUTES.HOME, redirect: false });
    } catch (error) {
      console.log(error);

      // Show error message
      toast({
        title: "Sign-in Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign-in",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className="bg-light-900 text-dark-200 rounded-2 min-h-12 flex-1 px-4 py-3.5"
        onClick={() => handleSignIn("github")}
      >
        <Image
          src="/icons/github.svg"
          alt="Github"
          width={20}
          height={20}
          className="object-contain invert-colors mr-2.5"
        />
        <span>Log in with Github</span>
      </Button>

      <Button
        className="bg-light-900 text-dark-200 rounded-2 min-h-12 flex-1 px-4 py-3.5"
        onClick={() => handleSignIn("google")}
      >
        <Image
          src="/icons/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="object-contain invert-colors mr-2.5"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
