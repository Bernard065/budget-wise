"use client";

import React, { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { Menu } from "lucide-react";

import NavButton from "./NavButton";
import { navLinks } from "@/constants";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const handleNavigation = useCallback(
    (href: string) => {
      router.push(href);
      setIsOpen(false);
    },
    [router]
  );

  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="font-normal bg-white/10 hover:bg-white/20 text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none focus:bg-white/30 transition-all"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-light-900 px-4 py-8">
            <nav className="flex flex-col gap-4">
              {navLinks.map((item) => {
                const isActive =
                  (pathname.includes(item.route) && item.route.length > 1) ||
                  pathname === item.route;

                return (
                  <Button
                    key={item.route}
                    variant="ghost"
                    onClick={() => handleNavigation(item.route)}
                    className={cn(
                      "hover:bg-blue-300 hover:text-white transition-colors rounded-2 w-full justify-start",
                      isActive ? "bg-blue-500 text-white" : "bg-transparent"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      ) : (
        <nav className="hidden lg:flex items-center gap-4 overflow-x-auto px-4 py-2">
          {navLinks.map((item) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;

            return (
              <NavButton
                key={item.route}
                href={item.route}
                label={item.label}
                isActive={isActive}
                aria-current={isActive ? "page" : undefined}
              />
            );
          })}
        </nav>
      )}
    </>
  );
};

export default Navbar;
