import { create } from "zustand";

type CurrencyState = {
  selectedCurrencies: string[];
  setSelectedCurrencies: (update: (prevSelected: string[]) => string[]) => void;
  filteredCurrencies: string[];
  setFilteredCurrencies: (currencies: string[]) => void;
  exchangeRates: Record<string, Record<string, number>>;
  setExchangeRates: (date: string, rates: Record<string, number>) => void;
}

const useCurrencyStore = create<CurrencyState>((set) => ({
  selectedCurrencies: [],
  setSelectedCurrencies: (update) => set((state) => ({
    selectedCurrencies: update(state.selectedCurrencies),
  })),
  filteredCurrencies: [],
  setFilteredCurrencies: (currencies) => set({ filteredCurrencies: currencies }),
  exchangeRates: {},
  setExchangeRates: (date, rates) =>
    set((state) => ({
      exchangeRates: {
        ...state.exchangeRates,
        [date]: rates,
      },
    })),
}));

export default useCurrencyStore;
