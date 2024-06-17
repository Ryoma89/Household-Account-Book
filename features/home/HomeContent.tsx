import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HomeContent = () => {
  return (
    <section>
      <div className="p-5 md:grid md:grid-cols-2 lg:p-10">
        <div className="text-center md:flex md:flex-col md:justify-center">
          <h2 className="text-4xl font-bold">MoneyMate</h2>
          <p className="text-lg  mt-5 font-semibold">
            Your Best Partner in Household Budgeting
          </p>
          <div className="mt-10">
            <div>
              <Link href="/auth/login">
                <Button className="bg-accentColor w-full font-bold sm:w-2/3">
                  Login
                </Button>
              </Link>
            </div>
            <div className="mt-5">
              <Link href="/auth/signup">
                <Button className="bg-subColor w-full font-bold sm:w-2/3">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <img src="/home.png" alt="" className="h-full" />
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
