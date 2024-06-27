import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HomeLogin = () => {
  return (
    <section className="px-5 py-14">
      <div>
        <p className="text-xl text-center font-semibold">If you are interested, click here↓↓</p>
      </div>
      <div className="mt-5 xs:w-[270px] xs:mx-auto">
        <Link href="/auth/login">
          <Button className="bg-buttonPrimary w-full font-bold sm:w-[270px]">
            Get Start!!
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HomeLogin;
