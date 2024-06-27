# 家計簿アプリ

## 概要

この家計簿アプリは、ユーザーが日々の取引を記録し、予算を管理するためのツールです。以下に各ページの概要を示します。

## ページ一覧

### Home Page

- **パス**: `/`
- **概要**: アプリの紹介とログイン/サインアップへのリンクを表示します。

### Dashboard Page

- **パス**: `/dashboard`
- **概要**: ユーザーの財務概要、最近の取引を表示するのに加え、取引を追加できます。

### Budget

- **パス**: `/budgets`
- **概要**: ユーザーの予算を表示し、新規予算を追加、編集、削除することができます。また、各月の支出、予算から支出を引いた差額も表示します。

### Chart Page

- **パス**: `/chart`
- **概要**: Pie, Donut, Bar Chart を表示し、それぞれの用途にあった chart を表示します。

### Multi Currency Page

- **パス**: `/multiCurrency`
- **概要**: "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "INR" の 10 通貨の中から 1 つを選択することで、その通貨に変換された金額を確認できます。

### プロフィールページ

- **パス**: `/settings/profile`
- **概要**: ユーザーのプロフィール情報を表示し、編集することができます。

## インストール方法

1. リポジトリをクローンします:
   ```bash
   git clone https://github.com/Ryoma89/Household-Account-Book.git
   ```
2. 必要なパッケージをインストールします:

   ```bash
   cd household-budget-app
   npm install
   ```

3. 環境変数を設定します:
   `.env`ファイルを作成し、以下のように環境変数を設定します:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   NEXT_PUBLIC_SITE_URL=localhost:3000
   NEXT_PUBLIC_EXCHANGERATE_API_KEY=
   ```

````

4. アプリを起動します:
   ```bash
   npm run dev
````

## 使用技術

- **フロントエンド**: Next.js
- **バックエンド**: Supabase
- **スタイル**: Tailwind CSS, Shadcn UI
- **状態管理**: Zustand

## データベース構造

### Profiles テーブル

- **Id**: プライマリキー
- **Email**: ユーザーのメールアドレス
- **Name**: ユーザーの名前
- **Introduce**: 自己紹介
- **avatar_url**: アバター画像の URL
- **primary_currency**: プライマリ通貨

### Transactions テーブル

- **Id**: プライマリキー
- **User_id**: 外部キー（Profiles テーブルの Id）
- **Date**: 取引の日付
- **Category**: 取引のカテゴリ
- **Amount**: 取引金額
- **converted_amount**: 変換された金額
- **Type**: 取引のタイプ
- **Content**: 取引内容
- **Currency**: 通貨
- **created_at**: 作成日時

### Budgets テーブル

- **id**: プライマリキー
- **user_id**: 外部キー（Profiles テーブルの Id）
- **month**: 予算の月
- **Amount**: 予算金額
- **created_at**: 作成日時
- **Updated**: 更新日時
- **Currency**: 通貨

## 追加情報

### Chart Page
- **パス**: `/chart`
- **概要**: Pie, Donut, Bar Chart を表示し、それぞれの用途にあったチャートを表示します。
- **詳細**:

  - **PieChart.tsxの説明**:
    `PieChart.tsx`ファイルは、円グラフを表示するコンポーネントを定義しています。`react-chartjs-2`ライブラリを使用してデータを視覚化し、`transformTData.ts`ファイルからデータ変換関数をインポートして使用しています。

    ```typescript
    import React from 'react';
    import { Pie } from 'react-chartjs-2';
    import transformToPieData from './transformData';
    import { TransactionType } from '@/types/transaction';

    type PieChartProps = {
      transactions: TransactionType[];
      selectedMonth: string;
    };

    const PieChart = ({ transactions, selectedMonth }: PieChartProps) => {
      const data = transformToPieData(transactions, selectedMonth); // データ変換関数を使用

      return (
        <div>
          <h2>Pie Chart</h2>
          <Pie data={data} />
        </div>
      );
    };

    export default PieChart;
    ```

  - **transformData.tsの説明**:
    `transformData.ts`ファイルは、取引データを円グラフ用のデータ形式に変換する関数を定義しています。この関数は、収入と支出のカテゴリごとにデータを集計し、それぞれのカテゴリに色を割り当てて返します。
    

  - **実装の詳細**:
    - **データのフィルタリング**:
      `transformToPieData`関数は、`transactions`配列から指定された月（`selectedMonth`）に該当する取引をフィルタリングします。

      ```typescript
      const filteredTransactions = transactions.filter((transaction) => transaction.date.startsWith(selectedMonth));
      ```

    - **収入と支出の集計**:
      フィルタリングされた取引から収入（`Income`）と支出（`Expense`）を別々に集計します。各カテゴリごとに金額を合計し、`incomeData`および`expenseData`オブジェクトに格納します。

      ```typescript
      const incomeData: IncomeData = filteredTransactions
        .filter((t) => t.type === "Income")
        .reduce((acc: IncomeData, t) => {
          const category = t.category as IncomeCategory;
          acc[category] = (acc[category] || 0) + t.amount;
          return acc;
        }, {});

      const expenseData: ExpenseData = filteredTransactions
        .filter((t) => t.type === "Expense")
        .reduce((acc: ExpenseData, t) => {
          const category = t.category as ExpenseCategory;
          acc[category] = (acc[category] || 0) + t.amount;
          return acc;
        }, {});
      ```

    - **データセットの構築**:
      `incomeData`と`expenseData`を使用して、円グラフ用のデータセットを構築します。各カテゴリに対して事前に定義された色（`incomeColors`および`expenseColors`）を適用します。

      ```typescript
      return {
        labels: [...Object.keys(incomeData), ...Object.keys(expenseData)],
        datasets: [
          {
            label: 'Income',
            data: Object.values(incomeData),
            backgroundColor: Object.keys(incomeData).map((category) => incomeColors[category as IncomeCategory] || "rgba(169, 169, 169, 1)"),
            borderColor: Object.keys(incomeData).map((category) => incomeColors[category as IncomeCategory] || "rgba(169, 169, 169, 1)"),
            borderWidth: 1,
          },
          {
            label: 'Expense',
            data: Object.values(expenseData),
            backgroundColor: Object.keys(expenseData).map((category) => expenseColors[category as ExpenseCategory] || "rgba(169, 169, 169, 1)"),
            borderColor: Object.keys(expenseData).map((category) => expenseColors[category as ExpenseCategory] || "rgba(169, 169, 169, 1)"),
            borderWidth: 1,
          }
        ]
      };
      ```

    - **グラフのレンダリング**:
      `PieChart`コンポーネントでは、`transformToPieData`関数を呼び出して変換されたデータを取得し、`react-chartjs-2`ライブラリの`Pie`コンポーネントに渡します。これにより、収入と支出のカテゴリ別の円グラフが描画されます。

      ```typescript
      const data = transformToPieData(transactions, selectedMonth);
      ```

### Multi Currency Page
- **パス**: `/multiCurrency`
- **概要**: "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "INR" の10通貨の中から1つを選択することで、その通貨に変換された金額を確認できます。
- **詳細**:
  - **MultiCurrency.tsxの説明**:
    `MultiCurrency.tsx`ファイルは、Multi Currencyページのメインコンポーネントです。このコンポーネントでは、通貨の選択や変換結果の表示を行います。

    ```typescript
    import React from 'react';
    import MultiCurrencyCard from './MultiCurrencyCard';
    import MultiCurrencySelect from './MultiCurrencySelect';
    import MultiCurrencyTable from './multiCurrencyTable';
    import { useCurrencyStore } from './useCurrencyStore';

    const MultiCurrency = () => {
      const { selectedCurrency } = useCurrencyStore();

      return (
        <div>
          <h1>Multi Currency Page</h1>
          <MultiCurrencySelect />
          {selectedCurrency && (
            <>
              <MultiCurrencyCard />
              <MultiCurrencyTable />
            </>
          )}
        </div>
      );
    };

    export default MultiCurrency;
    ```

  - **MultiCurrencyCard.tsxの説明**:
    `MultiCurrencyCard.tsx`ファイルは、選択された通貨に関する情報を表示するカードコンポーネントを定義しています。

    ```typescript
    import React from 'react';
    import { useCurrencyStore } from './useCurrencyStore';

    const MultiCurrencyCard = () => {
      const { selectedCurrency, exchangeRates } = useCurrencyStore();

      if (!selectedCurrency) return null;

      return (
        <div>
          <h2>{selectedCurrency} Exchange Rate</h2>
          <p>1 {selectedCurrency} = {exchangeRates[selectedCurrency]} USD</p>
        </div>
      );
    };

    export default MultiCurrencyCard;
    ```

  - **MultiCurrencySelect.tsxの説明**:
    `MultiCurrencySelect.tsx`ファイルは、ユーザーが通貨を選択するためのドロップダウンメニューを提供します。

    ```typescript
    import React from 'react';
    import { useCurrencyStore } from './useCurrencyStore';

    const MultiCurrencySelect = () => {
      const { currencies, setSelectedCurrency } = useCurrencyStore();

      return (
        <select onChange={(e) => setSelectedCurrency(e.target.value)}>
          <option value="">Select a currency</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      );
    };

    export default MultiCurrencySelect;
    ```

  - **multiCurrencyTable.tsxの説明**:
    `multiCurrencyTable.tsx`ファイルは、選択された通貨に基づいて変換された取引データを表示するテーブルコンポーネントを定義しています。

    ```typescript
    import React from 'react';
    import DataTable from './dataTable';
    import { useCurrencyStore } from './useCurrencyStore';

    const MultiCurrencyTable = () => {
      const { transactions, selectedCurrency, exchangeRates } = useCurrencyStore();

      const transformedTransactions = transactions.map(transaction => ({
        ...transaction,
        convertedAmount: transaction.amount * exchangeRates[selectedCurrency],
      }));

      return <DataTable data={transformedTransactions} />;
    };

    export default MultiCurrencyTable;
    ```

  - **fetchExchangeRates.tsの説明**:
    `fetchExchangeRates.ts`ファイルは、外部APIから為替レートを取得する関数を提供します。

    ```typescript
    import axios from 'axios';

    const fetchExchangeRates = async () => {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      return response.data.rates;
    };

    export default fetchExchangeRates;
    ```

  - **useCurrencyStore.tsの説明**:
    `useCurrencyStore.ts`ファイルは、Zustandを使用して通貨関連の状態管理を行うためのカスタムフックを提供します。

    ```typescript
    import create from 'zustand';

    export const useCurrencyStore = create((set) => ({
      currencies: ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "INR"],
      selectedCurrency: null,
      exchangeRates: {},
      transactions: [],
      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
      setExchangeRates: (rates) => set({ exchangeRates: rates }),
      setTransactions: (transactions) => set({ transactions }),
    }));
    ```

    - **計算方法の詳細**:
    Multi Currencyページの計算は主に以下のステップで行われます：

    1. **為替レートの取得**:
        `fetchExchangeRates.ts`ファイルで、外部APIから指定された日付の為替レートを取得します。

        ```typescript
        'use client'
        import { currencies } from "@/constants/currencies";
        import useCurrencyStore from "@/store/useCurrencyStore";

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
        ```

        - この関数は、指定された日付（`date`）の為替レートを取得し、指定した通貨（`currencies`）にフィルタリングして返します。

    2. **為替レートの状態管理**:
        `useCurrencyStore.ts`ファイルで、Zustandを使用して為替レートと選択された通貨を管理します。

        ```typescript
        import create from 'zustand';

        const useCurrencyStore = create((set) => ({
          currencies: ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "INR"],
          selectedCurrency: null,
          exchangeRates: {},
          transactions: [],
          setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
          setExchangeRates: (rates) => set({ exchangeRates: rates }),
          setTransactions: (transactions) => set({ transactions }),
        }));

        export default useCurrencyStore;
        ```

        - `selectedCurrency`にユーザーが選択した通貨を設定し、`exchangeRates`に取得した為替レートを設定します。

    3. **通貨選択とデータ表示**:
        `MultiCurrencySelect.tsx`ファイルで、ユーザーが通貨を選択します。

        ```typescript
        import React from 'react';
        import useCurrencyStore from '@/store/useCurrencyStore';

        const MultiCurrencySelect = () => {
          const { currencies, setSelectedCurrency } = useCurrencyStore();

          return (
            <select onChange={(e) => setSelectedCurrency(e.target.value)}>
              <option value="">Select a currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          );
        };

        export default MultiCurrencySelect;
        ```

        - ユーザーが通貨を選択すると、その値が状態管理に保存されます。

    4. **変換結果の表示**:
        `multiCurrencyTable.tsx`ファイルで、選択された通貨に基づいて変換された取引データを表示します。

        ```typescript
        import React from 'react';
        import DataTable from './dataTable';
        import useCurrencyStore from '@/store/useCurrencyStore';

        const MultiCurrencyTable = () => {
          const { transactions, selectedCurrency, exchangeRates } = useCurrencyStore();

          const transformedTransactions = transactions.map(transaction => ({
            ...transaction,
            convertedAmount: transaction.amount / exchangeRates[transaction.currency] * exchangeRates[selectedCurrency],
          }));

          return <DataTable data={transformedTransactions} />;
        };

        export default MultiCurrencyTable;
        ```

        - `transactions`配列の各取引について、まずその取引の通貨をUSDに変換し、その後選択された通貨に再変換します。
        - 例えば、取引がJPYで記録されている場合、選択された通貨がEURであれば、`convertedAmount`は`transaction.amount / exchangeRates["JPY"] * exchangeRates["EUR"]`となります。
        - 変換された取引データを`DataTable`コンポーネントに渡して表示します。

  - **計算過程の詳細**:
    1. **収入（Income）の変換**:
        - 収入の取引（typeが"Income"）は、まずその取引の通貨をUSDに変換し、その後選択された通貨に再変換されます。
        - 例えば、¥100000の給料収入があり、選択された通貨がEURであれば、為替レートが110（JPY to USD）および0.85（USD to EUR）の場合、変換された金額は`100000 / 110 * 0.85 = 772.73 EUR`となります。

    2. **支出（Expense）の変換**:
        - 支出の取引（typeが"Expense"）も同様に、まずその取引の通貨をUSDに変換し、その後選択された通貨に再変換されます。
        - 例えば、€100の食費支出があり、選択された通貨がJPYであれば、為替レートが0.85（EUR to USD）および110（USD to JPY）の場合、変換された金額は`100 / 0.85 * 110 = 12941.18 JPY`となります。

    3. **為替レートの使用**:
        - 取得した為替レートは、USD基準で提供されます。選択された通貨に対する為替レートを使用して、各取引の金額を変換します。
        - 例えば、為替レートオブジェクトが以下のような場合：
          ```json
          {
            "USD": 1,
            "EUR": 0.85,
            "JPY": 110,
            "GBP": 0.75,
            ...
          }
          ```
        - これに基づいて、取引の金額を選択された通貨に変換します。