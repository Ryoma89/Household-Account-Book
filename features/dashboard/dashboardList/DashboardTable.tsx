'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { columns as defaultColumns } from './columns';
import Title from '@/app/components/elements/Title';
import SelectedMonth from '@/app/components/elements/selectedMonth';
import useProfileStore from '@/store/profileStore';
import useTransactionStore from '@/store/transactionStore';
import useMonthStore from '@/store/selectedMonth';
import { useToast } from '@/components/ui/use-toast';
import useFetchTransactions from '@/hooks/useFetchTransactions';

const DashboardTable = () => {
  const { user } = useProfileStore();
  const { transactions, fetchTransactions, deleteTransaction, deleteTransactions } = useTransactionStore();
  const { selectedMonth } = useMonthStore();
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const loading = useFetchTransactions(user?.id);

  const fetchUserTransactions = useCallback(async () => {
    if (user && user.id) {
      await fetchTransactions(user.id);
    }
  }, [user, fetchTransactions]);

  useEffect(() => {
    fetchUserTransactions();
  }, [fetchUserTransactions]);

  const filteredTransactions = transactions.filter(transaction =>
    transaction && transaction.date.startsWith(selectedMonth)
  );

  const handleDeleteSelected = () => {
    deleteTransactions(Array.from(selectedTransactions));
    setSelectedTransactions(new Set());
    toast({
      title: 'Transactions deleted',
      description: 'The selected transactions have been deleted.',}) ;   
  }

  const columns = defaultColumns(deleteTransaction);

  return (
    <div className="container mx-auto py-10">
      <Title title="Dashboard List" />
      <SelectedMonth />
      <DataTable columns={columns} data={filteredTransactions} onRowDelete={deleteTransaction} onSelectionChange={setSelectedTransactions} selectedTransactions={selectedTransactions}/>
    </div>
  );
};

export default DashboardTable;
