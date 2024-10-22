declare global {
  type TimeScale = "day" | "week" | "month" | "year";

  type TransactionBalanceChartData = {
    time: string;
    transaction: number;
    balance: number;
  };

  type OverviewCardProp = {
    title: string;
    progression: number;
    amount: number;
    label: string;
    description: string;
    icon: string;
  };
}

export { type TimeScale, type TransactionBalanceChartData, type OverviewCardProp };
