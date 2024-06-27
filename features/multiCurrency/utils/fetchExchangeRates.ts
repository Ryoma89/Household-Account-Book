'use client'
import { currencies } from "@/constants/currencies";

const fetchExchangeRates = async (date: string): Promise<Record<string, number>> => {
  try {
    const url = `https://openexchangerates.org/api/historical/${date}.json?app_id=${process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY}`;
    const response = await fetch(url);
    if(response.ok) {
      const data = await response.json();
      const filteredRates = currencies.reduce((acc, currency) => {
        if(data.rates[currency]) {
          acc[currency] = data.rates[currency];
        }
        return acc;
      }, {} as Record<string, number>);

      return filteredRates;
    } else {
      console.error("Error fetching exchange rates:", response.statusText);
      return {};
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return {};
  }
}

export default fetchExchangeRates;
