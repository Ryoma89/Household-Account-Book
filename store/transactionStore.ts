import { create } from "zustand";
import { TransactionType } from "@/types/transaction";
import { supabase } from "@/lib/supabase";

type TransactionState = {
  transactions: TransactionType[];
  setTransactions: (payload: TransactionType[]) => void;
  addTransaction: (transaction: TransactionType) => void;
  fetchTransactions: (userId: string) => Promise<void>;
  deleteTransaction: (transactionId: string) => void;
  deleteTransactions: (transactionIds: string[]) => void;
};

const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  setTransactions: (payload) => set({ transactions: payload }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  fetchTransactions: async (userId: string) => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching transactions:", error);
    } else {
      console.log("Fetched transactions:", data);
      set({ transactions: data as TransactionType[] });
    }
  },
  deleteTransaction: async (transactionId) => {
    const { error } = await supabase.from('transactions').delete().eq('id', transactionId);
    if (error) {
      console.error('Error deleting transaction:', error);
    }
    set((state) => ({
      transactions: state.transactions.filter((transaction) => transaction.id !== transactionId),
    }));
  },
  deleteTransactions: async (transactionIds) => {
    const { error } = await supabase.from('transactions').delete().in('id', transactionIds);
    if (error) {
      console.error('Error deleting transactions:', error);
    }
    set((state) => ({
      transactions: state.transactions.filter((transaction) => !transactionIds.includes(transaction.id)),
    }));
  },
}));

export default useTransactionStore;
