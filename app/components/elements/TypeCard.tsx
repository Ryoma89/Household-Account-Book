import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  amount: number;
  currencySymbol: string | null;
  color: string;
}

const TypeCard = ({ title, amount, currencySymbol, color }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={`text-center ${color} xs:text-3xl`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center font-bold text-2xl xs:text-3xl">{currencySymbol}{amount !== undefined ? amount.toFixed(2): "0.00"}</p>
      </CardContent>
    </Card>
  );
};

export default TypeCard;
