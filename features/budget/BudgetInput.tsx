"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import useProfileStore from "@/store/profileStore";
import useMonthStore from "@/store/selectedMonth";
import useBudgetStore from "@/store/budgetStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { generateMonths } from "@/utils/getMonths";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  month: z.string().min(7).max(7),
  amount: z.preprocess((val) => parseFloat(val as string), z.number()),
});

const BudgetInput = () => {
  const { user, fetchUserProfile } = useProfileStore();
  const { fetchBudgetAmount } = useBudgetStore();
  const { selectedMonth } = useMonthStore();
  const [login, setLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user.id) {
      setLogin(true);
      fetchUserProfile(user.id);
    }
  }, [user.id, fetchUserProfile]);

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: "",
      amount: 0,
    },
  });

  const { control, handleSubmit, reset } = methods;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!login) {
      toast({
        title: "Error",
        description: "You are not logged in.",
        variant: "destructive",
      });
      return;
    }

    const { data: existingBudgets, error: fetchError } = await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", user.id)
      .eq("month", values.month);

    if (fetchError) {
      console.error("Error fetching existing budgets:", fetchError);
      return;
    }

    if (existingBudgets && existingBudgets.length > 0) {
      const { error: updateError } = await supabase
        .from("budgets")
        .update({
          amount: values.amount,
          currency: user.primary_currency,
          updated_at: new Date(),
        })
        .eq("id", existingBudgets[0].id);

      if (updateError) {
        toast({
          title: "Error",
          description: "Failed to update budget.",
          variant: "destructive",
        });
      }
    } else {
      const { error: insertError } = await supabase.from("budgets").insert([
        {
          user_id: user.id,
          month: values.month,
          amount: values.amount,
          currency: user.primary_currency,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);

      if (insertError) {
        toast({
          title: "Error",
          description: "Failed to insert budget.",
          variant: "destructive",
        });
      }
    }

    await fetchBudgetAmount();
    setIsOpen(false);
    reset();
  };

  const months = generateMonths();

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="bg-buttonPrimary rounded-lg text-white p-2 w-[180px]">
            Add Budget
          </DialogTrigger>
          <DialogContent className="w-10/12">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
                {/* months */}
                <FormField
                  name="month"
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger type="button">
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* primary currency */}
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <p>{user.primary_currency}</p>
                </FormItem>
                {/* amount */}
                <FormField
                  name="amount"
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter amount"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-buttonPrimary">
                  Submit
                </Button>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BudgetInput;
