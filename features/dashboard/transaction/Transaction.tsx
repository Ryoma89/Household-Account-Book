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
import useProfileStore from "@/store/profileStore";
import useFetchTransactions from "@/hooks/useFetchTransactions";
import Loading from "@/app/components/elements/Loading";

const Transaction = () => {
  const [open, setOpen] = useState(false);
  const { user } = useProfileStore();

  const loading = useFetchTransactions(user?.id);

  if (loading) {
    return (
      <div className="px-5 py-7">
        <Title title="Transaction" />
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className="mt-5 sm:hidden">
        <Title title="Transaction" />
        <div className="mt-10 w-[180px] mx-auto ">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-buttonPrimary w-[180px]">
                New Transaction
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

      <div className="hidden sm:block ">
      <Title title="Transaction" />
      <div className="sm:mt-10">
      <Card>
          <div className="sm:mt-7"></div>
          <CardContent>
            <TransactionForm onClose={() => setOpen(false)} />
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
};

export default Transaction;
