import { create } from "zustand";
import useProfileStore from "./profileStore";
import useMonthStore from "./selectedMonth";
import { supabase } from "@/lib/supabase";

type budgetState = {
  fetchBudgetAmount: () => Promise<void>;
  budgetAmount: number;
  budgetBalance: number;
  expense: number;
  setExpense: (expense: number) => void;
  setBudgetBalance: () => void; // 追加
}

const useBudgetStore = create<budgetState>((set, get) => ({
  budgetAmount: 0,
  budgetBalance: 0,
  expense: 0,
  fetchBudgetAmount: async () => {
    const user = useProfileStore.getState().user;
    const selectedMonth = useMonthStore.getState().selectedMonth;

    if (!user.id) {
      console.error("Error: user.id is undefined");
      return;
    }

    try {
      const { data, error, status } = await supabase
        .from("budgets")
        .select("amount")
        .eq("user_id", user.id)
        .eq("month", selectedMonth)
        .single();

      if (error && status !== 406) {
        console.error("Error fetching budget amount:", error);
        return;
      }

      if (data) {
        set({ budgetAmount: data.amount });
      } else {
        console.log("No budget data found for the selected month.");
        set({ budgetAmount: 0 });
      }
      get().setBudgetBalance(); // 追加
    } catch (error) {
      console.error("Error in fetchBudgetAmount:", error);
      set({ budgetAmount: 0 });
      get().setBudgetBalance(); // 追加
    }
  },
  setExpense: (expense) => set({ expense }),
  setBudgetBalance: () => {
    const { budgetAmount, expense } = get();
    set({ budgetBalance: budgetAmount - expense });
  } // 追加
}))

export default useBudgetStore