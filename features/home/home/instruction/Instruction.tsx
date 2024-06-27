import { ChartBarIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "lucide-react";
import React from "react";

const Instruction = () => {
  return (
    <section className="bg-HomeBg px-5 py-12 sm:px-10">
      <h2 className="text-2xl text-center font-bold sm:text-3xl">Why Use This App?</h2>
      <ul className="mt-5 space-y-3 max-w-md mx-auto sm:space-y-4 sm:mt-8">
        <li className="flex justify-start items-center">
          <HomeIcon className="mr-2 h-6 min-w-8" />
          <span className="text-sm sm:text-md">
            Simplify and streamline your household budgeting process.
          </span>
        </li>
        <li className="flex justify-start items-center">
          <GlobeAltIcon className="mr-2 h-6 min-w-8" />
          <span className="text-sm sm:text-md">
            Manage your finances globally with multi-currency support.
          </span>
        </li>
        <li className="flex justify-start items-center">
          <ChartBarIcon className="mr-2 h-6 min-w-8" />
          <span className="text-sm sm:text-md">
            Benefit from an intuitive interface and powerful features that help
            you stay on top of your finances.
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Instruction;
