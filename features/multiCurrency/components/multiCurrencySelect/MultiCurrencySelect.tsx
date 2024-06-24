import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MultiCurrencyCard from "./MultiCurrencyCard";

const MultiCurrencySelect = () => {
  return (
    <>
      <div className="flex justify-center mt-10 md:hidden">
        <Dialog>
          <DialogTrigger className="bg-buttonPrimary rounded-lg text-white p-2 w-[180px] mx-auto">
            Select Currency
          </DialogTrigger>
          <DialogContent className="w-11/12">
            <MultiCurrencyCard />
          </DialogContent>
        </Dialog>
      </div>

      <div className="hidden md:block md:w-2/3 md:mx-auto">
        <MultiCurrencyCard />
      </div>
    </>
  );
};

export default MultiCurrencySelect;
