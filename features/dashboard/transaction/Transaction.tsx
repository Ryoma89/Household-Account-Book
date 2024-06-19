"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Title from "@/app/components/elements/Title";
import { Button } from "@/components/ui/button";
import TransactionForm from "./TransactionForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Transaction = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="px-5 py-7 sm:hidden">
        <Title title="Transaction" />
        <div className="mt-10 w-[120px] mx-auto ">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-buttonPrimary w-[120px]">
                Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 rounded-lg">
              <DialogHeader>
                <DialogTitle>Transaction</DialogTitle>
                <DialogDescription>Enter transaction details</DialogDescription>
              </DialogHeader>
              <TransactionForm onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="hidden sm:block sm:p-10">
        <Card>
          <CardHeader>
            <CardTitle>
              {" "}
              <Title title="Transaction" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm onClose={() => setOpen(false)} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Transaction;
