declare global {
  type TimeScale = "day" | "week" | "month" | "year";

  type TransactionBalanceChartData = {
    time: string;
    transaction: number;
    balance: number;
  };
}

export { type TimeScale, type TransactionBalanceChartData };
