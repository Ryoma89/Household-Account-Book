import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <header className="px-5 py-3 h-auto lg:px-10 lg:py-7">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <h1>
          <img src="/title.png" alt="タイトル" className="h-14" />
        </h1>
        <nav className="hidden md:block">
          <ul className="flex items-center">
            <li className="mr-4">
              <Button
                variant="outline"
                className="bg-accentColor text-white font-bold w-[90px]"
              >
                Login
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                className="bg-subColor text-white font-bold w-[90px]"
              >
                Sign Up
              </Button>
            </li>
          </ul>
        </nav>

        <nav className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu size={24} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mt-10">
                <SheetTitle>
                  Login
                </SheetTitle>
                <Separator />
                <SheetTitle>
                  Sign UP
                </SheetTitle>
                <Separator />
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;
