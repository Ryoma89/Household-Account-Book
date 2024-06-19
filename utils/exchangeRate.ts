// 為替レートを取得する関数
export const getExchangeRate = async (fromCurrency: string, toCurrency: string,date: string) :Promise<number> => {
  const response = await fetch(`/api/exchangeRates?date=${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch exchange rate");
  }

    const data = await response.json();
    console.log(`Exchange rate: ${data}`, data.rates);

    const fromRate = data.rates[fromCurrency];
    const toRate = data.rates[toCurrency];

    console.log(`From currency: ${fromCurrency}, Rate: ${fromRate}`);
  console.log(`To currency: ${toCurrency}, Rate: ${toRate}`);

  if (!fromRate || !toRate) {
    throw new Error(`Exchange rate for ${fromCurrency} or ${toCurrency} not found`);
  }

  return toRate / fromRate;
}