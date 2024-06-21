"use client";
import Title from "@/app/components/elements/Title";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import useProfileStore from "@/store/profileStore";
import useTransactionStore from "@/store/transactionStore";
import useMonthStore from "@/store/selectedMonth";
import { PieChartData } from "@/types/chart";
import useFetchTransactions from "@/hooks/useFetchTransactions";
import { Bar, Pie } from "react-chartjs-2";
import { Skeleton } from "@/components/ui/skeleton";
import transformData from "./utils/transaformData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { user } = useProfileStore();
  const { transactions } = useTransactionStore();
  const { selectedMonth } = useMonthStore();
  const [data, setData] = useState<PieChartData>({
    labels: [],
    datasets: [],
  });

  const loading = useFetchTransactions(user?.id);

  useEffect(() => {
    if (transactions) {
      const barData = transformData(transactions, selectedMonth);
      setData(barData);
    }
  }, [transactions, selectedMonth]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }

  if (loading) {
    return (
      <div className="px-5 py-7">
        <div className="mt-10 space-y-4">
          <Skeleton className="w-full h-[30px] rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-10">
      <Title title="Bar Chart" />
      <div className="mt-10">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Daily</CardTitle>
              </CardHeader>
              <CardContent>
                {data.labels.length > 0 ? (
                  <div>
                    <Bar data={data} options={options} />
                  </div>
                ) : (
                  <div className="text-center">No data</div>
                )}
              </CardContent>
            </Card>
      </div>
    </div>
  )
}

export default BarChart
