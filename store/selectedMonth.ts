import { getCurrentYearMonth } from "@/utils/getCurrentYearMonth";
import { create } from "zustand";

type MonthState = {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const useMonthStore = create<MonthState>((set) => ({
  selectedMonth: getCurrentYearMonth(),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}))

export default useMonthStore