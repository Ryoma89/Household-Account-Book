'use client'
import Title from '@/app/components/elements/Title'
import TypeCard from '@/app/components/elements/TypeCard'
import React, { useCallback, useEffect, useState } from 'react'
import useProfileStore from "@/store/profileStore";
import useMonthStore from '@/store/selectedMonth';
import useTransactionStore from '@/store/transactionStore';
import { getCurrencySymbol } from '@/constants/currencies';
import SelectedMonth from '@/app/components/elements/selectedMonth';
import { Skeleton } from "@/components/ui/skeleton"
import Loading from '@/app/components/elements/Loading';

const BalanceSheet = () => {
  const { user } = useProfileStore();
  const { selectedMonth } = useMonthStore();
  const { transactions, fetchTransactions } = useTransactionStore();
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setLoading(true);
        await fetchTransactions(user.id);
        setLoading(false);
      }
    };
    fetchData();
  }, [user, fetchTransactions]);

  const calculateBalance = useCallback(() => {
    if (transactions) {
      const filteredTransactions = transactions.filter(
        (transaction) => transaction !== null && transaction !== undefined && transaction.date.startsWith(selectedMonth)
      );

      const incomeSum = filteredTransactions
        .filter((transaction) => transaction.type === "Income")
        .reduce((sum, transaction) => sum + Number(transaction.converted_amount), 0);

      const expenseSum = filteredTransactions
        .filter((transaction) => transaction.type === "Expense")
        .reduce((sum, transaction) => sum + Number(transaction.converted_amount), 0);

      setIncome(incomeSum);
      setExpense(expenseSum);
    }
  }, [transactions, selectedMonth]);

  useEffect(() => {
    if (!loading) {
      calculateBalance();
    }
  }, [transactions, selectedMonth, loading, calculateBalance]);

  const balance = income - expense;

  if (loading) {
    return (
      <div className='px-5 py-7'>
        <Title title="Balance Sheet" />
        <div className='mt-10 space-y-4'>
          <Loading />
          <Loading />
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className='mt-10 md:mt-0'>
      <Title title="Balance Sheet" />
      <SelectedMonth />
      <div className='mt-10 space-y-4'>
        <TypeCard title='Income' amount={income} currencySymbol={getCurrencySymbol(user.primary_currency)} color="text-blue-500" />
        <TypeCard title='Expense' amount={expense} currencySymbol={getCurrencySymbol(user.primary_currency)} color="text-red-500" />
        <TypeCard title='Balance' amount={balance} currencySymbol={getCurrencySymbol(user.primary_currency)} color="text-green-500" />
      </div>
    </div>
  );
};

export default BalanceSheet;
