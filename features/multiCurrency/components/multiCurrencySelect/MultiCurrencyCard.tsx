'use client'
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currencies } from "@/constants/currencies";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useCurrencyStore from "@/store/useCurrencyStore";

const MultiCurrencyCard = () => {
  const { selectedCurrencies, setSelectedCurrencies, setFilteredCurrencies } =
    useCurrencyStore((state) => ({
      selectedCurrencies: state.selectedCurrencies,
      setSelectedCurrencies: state.setSelectedCurrencies,
      setFilteredCurrencies: state.setFilteredCurrencies,
    }));

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrencies((prevSelected: string[]) =>
      prevSelected.includes(currency)
        ? prevSelected.filter((c) => c !== currency)
        : [...prevSelected, currency]
    );
  };

  const applyFilter = () => {
    setFilteredCurrencies(selectedCurrencies);
    console.log("Selected currencies:", selectedCurrencies);
  };

  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Select Currency</CardTitle>
          <CardDescription className="text-center">
            Choose the currencies you want to include in your financial
            overview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid md:grid-cols-4 lg:grid lg:grid-cols-5">
            {currencies.map((currency) => (
              <div key={currency} className="w-[57px] mx-auto flex items-center my-1">
                <Checkbox 
                id={currency} 
                className="mr-2"
                checked={selectedCurrencies.includes(currency)}
                onCheckedChange={() => handleCurrencyChange(currency)}
                />
                <Label htmlFor={currency} className="">
                  {currency}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-28 mx-auto">
            <Button className="bg-buttonPrimary w-28" onClick={applyFilter}>Apply</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MultiCurrencyCard;
