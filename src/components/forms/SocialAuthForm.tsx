import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const SocialAuthForm = () => {
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className="bg-light-900 text-dark-200 rounded-2 min-h-12 flex-1 px-4 py-3.5">
        <Image
          src="/icons/github.svg"
          alt="Github"
          width={20}
          height={20}
          className="object-contain invert-colors mr-2.5"
        />
        <span>Log in with Github</span>
      </Button>

      <Button className="bg-light-900 text-dark-200 rounded-2 min-h-12 flex-1 px-4 py-3.5">
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
