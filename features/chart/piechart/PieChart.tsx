"use client";
import Title from "@/app/components/elements/Title";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
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
import transformToPieData from "./utils/transformData";
import { Pie } from "react-chartjs-2";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
);

const PieChart = () => {
  const { user } = useProfileStore();
  const { transactions } = useTransactionStore();
  const { selectedMonth } = useMonthStore();
  const [selectedType, setSelectedType] = useState<"Income" | "Expense">(
    "Income"
  );
  const [data, setData] = useState<PieChartData>({
    labels: [],
    datasets: [],
  });

  const loading = useFetchTransactions(user?.id);

  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      setData({
        labels: [],
        datasets: [],
      });
      return;
    }

    const filteredTransactions = transactions.filter((transaction) => {
      return (
        transaction &&
        transaction.type === selectedType &&
        transaction.date.startsWith(selectedMonth)
      );
    });

    if (filteredTransactions.length === 0) {
      setData({
        labels: [],
        datasets: [],
      });
      return;
    }

    const pieData = transformToPieData(filteredTransactions, selectedMonth);

    const datasetIndex = selectedType === "Income" ? 0 : 1;

    setData({
      labels: pieData.labels,
      datasets: [pieData.datasets[datasetIndex]],
    });
  }, [selectedType, selectedMonth, transactions]);

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
    <div className="">
      <Title title="Pie Chart" />
      <div className="mt-10">
        <Tabs
          defaultValue="income"
          onValueChange={(value) =>
            setSelectedType(value === "income" ? "Income" : "Expense")
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
          </TabsList>
          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Income</CardTitle>
              </CardHeader>
              <CardContent>
                {data.labels.length > 0 ? (
                  <div className="md:min-h-[250px] lg:min-h-[300px]">
                    <Pie data={data} options={options} />
                  </div>
                ) : (
                  <div className="text-center">No data</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expense">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Expense</CardTitle>
              </CardHeader>
              <CardContent>
                {data.labels.length > 0 ? (
                  <div className="md:min-h-[250px] lg:min-h-[300px]">
                    <Pie data={data} options={options} />
                  </div>
                ) : (
                  <div className="text-center">No data</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PieChart;
