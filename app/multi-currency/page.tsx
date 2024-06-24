import React from "react";
import Nav from "../components/layout/Nav";
import MultiCurrency from "@/features/multiCurrency/MultiCurrency";

const CurrencyPage = () => {
  return (
    <div>
      <Nav />
      <MultiCurrency />
    </div>
  );
};

export default CurrencyPage;
