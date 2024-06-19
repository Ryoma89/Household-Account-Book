"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { expenseCategories, incomeCategories } from "@/constants/categories";
import { currencies } from "@/constants/currencies";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import useProfileStore from "@/store/profileStore";
import useTransactionStore from "@/store/transactionStore"; 
import useModalStore from "@/store/modalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { getExchangeRate } from "@/utils/exchangeRate";

const formSchema = z.object({
  date: z.date().nullable().optional(),
  category: z.string().min(2).max(50),
  amount: z.preprocess((val) => parseFloat(val as string), z.number()),
  type: z.enum(["Income", "Expense"]),
  content: z.string().max(50),
  currency: z.string().min(3).max(3),
});

const TransactionForm = ({ onClose }: { onClose: () => void }) => {
  const { user, fetchUserProfile } = useProfileStore();
  const { addTransaction, fetchTransactions } = useTransactionStore();
  const { closeModal } = useModalStore();
  const [categories, setCategories] = useState<string[]>(incomeCategories);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user.id) {
      setLoading(true);
      fetchUserProfile(user.id);
    }
  }, [user.id, fetchUserProfile]);

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: null,
      category: "",
      type: undefined,
      amount: 0,
      content: "",
      currency: "USD",
    },
  });

  const { control, handleSubmit, watch, reset } = methods;

  // タイプに応じてカテゴリーを更新
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "type") {
        setCategories(
          value.type === "Income" ? incomeCategories : expenseCategories
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formattedDate = values.date ? format(values.date, "yyyy-MM-dd") : "";

    const primaryCurrency = user.primary_currency || "USD";
    console.log("primaryCurrency", primaryCurrency);

    try {
      const exchangeRate = await getExchangeRate(values.currency, primaryCurrency, formattedDate);
      if(isNaN(exchangeRate)) {
        throw new Error("Failed to calculate exchange rate");
      }
      const convertedAmount = values.amount * exchangeRate;
      console.log("convertedAmount", convertedAmount);

      // convertedAmountがNaNでないことを確認
      if (isNaN(convertedAmount)) {
        throw new Error("Failed to calculate converted amount");
      }

      const transaction = {
        date: formattedDate,
        category: values.category,
        amount: values.amount,
        converted_amount: convertedAmount,
        type: values.type,
        content: values.content,
        currency: values.currency,
        user_id: user.id,
      };
      console.log("transaction", transaction);

      const { data, error: insertError } = await supabase
        .from("transactions")
        .insert([transaction])
        .single();
        if (insertError) {
          toast({
            title: 'Error',
            description: 'An error occurred while inserting your transaction.',
            variant: 'destructive',
          });
          return;
        } else {
          toast({
            title: '✅ Success!!',
            description: 'Transaction has been successfully submitted.',
          });
          addTransaction(data);
          await fetchTransactions(user.id);
          reset();
          closeModal();
        }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred: ' + error,
        variant: 'destructive',
      });
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:mt-3 sm:space-y-4">
        {/* type */}
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className=" text-lg text-bold sm:text-xl">Type</FormLabel>
              <FormControl className="">
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* category */}
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className=" text-lg text-bold sm:text-xl">Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 通貨の選択 */}
        <FormField
          control={control}
          name="currency"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-lg text-bold sm:text-xl">Currency</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 日付の選択 */}
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg text-bold sm:text-xl">Date</FormLabel>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || undefined}
                    onSelect={(date) => {
                      field.onChange(date);
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 金額の入力 */}
        <FormField
          control={control}
          name="amount"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-lg text-bold sm:text-xl">Amount</FormLabel>
              <FormControl className="mt-0">
                <Input
                  placeholder="0"
                  {...field}
                  className="mt-0"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 内容の入力 */}
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem className="f">
              <FormLabel className="text-lg text-bold sm:text-xl">Content</FormLabel>
              <FormControl>
                <Input placeholder="Enter content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="sm:w-52 sm:mx-auto">
        <Button type="submit" className="w-full bg-buttonPrimary sm:text-lg sm:mt-5">
          Submit
        </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TransactionForm;
