import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import MultiCurrencyCard from "./MultiCurrencyCard";

const MultiCurrencySelect = () => {

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger className="bg-buttonPrimary rounded-lg text-white p-2 w-[180px] mx-auto">Select Currency</DialogTrigger>
        <DialogContent className="w-11/12">
          <MultiCurrencyCard />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MultiCurrencySelect;
