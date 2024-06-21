"use client";
import Title from "@/app/components/elements/Title";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  ArcElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import useProfileStore from "@/store/profileStore";
import useTransactionStore from "@/store/transactionStore";
import useMonthStore from "@/store/selectedMonth";
import { PieChartData } from "@/types/chart";
import useFetchTransactions from "@/hooks/useFetchTransactions";
import { Doughnut } from "react-chartjs-2";
import { Skeleton } from "@/components/ui/skeleton";
import transformData from "./utils/transformData";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartTitle
);

const DonutChart = () => {
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
      const doughnutData = transformData(transactions, selectedMonth);
      setData(doughnutData);
    }
  }, [transactions, selectedMonth]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

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
      <Title title="Donut Chart" />
      <div className="mt-10 md:mt-[88px]">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Income vs Expense</CardTitle>
              </CardHeader>
              <CardContent>
                {data.labels.length > 0 ? (
                  <div>
                    <Doughnut data={data} options={options} />
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

export default DonutChart