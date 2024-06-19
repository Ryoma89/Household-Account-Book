// トランザクション情報の型定義
export type TransactionType = {
  id: string;
  user_id: string;
  date: string;
  category: string;
  amount: number;
  converted_amount: number;
  type: string;
  content: string;
  currency: string;
  created_at: string;
};