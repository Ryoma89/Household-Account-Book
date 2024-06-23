'use client';
import useTransactionStore from "@/store/transactionStore";
import { useEffect, useState } from "react";

const useFetchTransactions = (userId: string | undefined) => {
  const fetchTransactions = useTransactionStore(
    (state) => state.fetchTransactions
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        setLoading(true);
        await fetchTransactions(userId);
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, fetchTransactions]);
  return loading;
};

export default useFetchTransactions;
