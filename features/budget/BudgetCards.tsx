'use client'
import TypeCard from '@/app/components/elements/TypeCard'
import { toast } from '@/components/ui/use-toast';
import { getCurrencySymbol } from '@/constants/currencies'
import useBudgetStore from '@/store/budgetStore';
import useProfileStore from '@/store/profileStore';
import useMonthStore from '@/store/selectedMonth';
import useTransactionStore from '@/store/transactionStore';
import React, { useCallback, useEffect } from 'react'

const BudgetCards = () => {
  const { user } = useProfileStore();
  const { transactions, fetchTransactions } = useTransactionStore();
  const { selectedMonth } = useMonthStore();
  const { budgetAmount, budgetBalance, fetchBudgetAmount, expense, setExpense, setBudgetBalance } = useBudgetStore();

  const calculateExpenses = useCallback(() => {
    try {
      if (transactions && transactions.length > 0) {
        const filteredTransactions = transactions.filter((transaction) => transaction !== null && transaction !== undefined && transaction.date.startsWith(selectedMonth));
    
        const expenseSum = filteredTransactions.filter((transaction) => transaction.type === "Expense").reduce((sum, transaction) => sum + Number(transaction.converted_amount), 0);
    
        setExpense(expenseSum);
        } else {
          setExpense(0);
        }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching transactions.",
        variant: "destructive",
      })
    }
  }, [transactions, selectedMonth, setExpense]);

  useEffect(() => {
    if (user.id) {
      fetchTransactions(user.id);
    }
  }, [selectedMonth, user.id, fetchTransactions]);

  useEffect(() => {
    fetchBudgetAmount();
  }, [selectedMonth, fetchBudgetAmount]);

  useEffect(() => {
    calculateExpenses();
  }, [transactions, selectedMonth, calculateExpenses]);

  useEffect(() => {
    setBudgetBalance();
  }, [budgetAmount, expense, setBudgetBalance])

  return (
    <div className='mt-5'>
      <div className='my-5'>
        <TypeCard title="Budget" amount={budgetAmount} currencySymbol={getCurrencySymbol(user.primary_currency)} color="text-blue-500" />
      </div>
      <div className='my-5'>
        <TypeCard title="Expense" amount={expense} currencySymbol={getCurrencySymbol(user.primary_currency)} color="text-red-500" />
      </div>
      <div className='my-5'>
        <TypeCard title="Balance" amount={budgetBalance} currencySymbol={getCurrencySymbol(user.primary_currency)} color="text-green-500" />
      </div>
    </div>
  )
}

export default BudgetCards
