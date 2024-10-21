import type { TimeScale, TransactionBalanceChartData } from "@/types";

const generateRandomTransactions = (
  numOfValues: number,
  min: number = -1800,
  max: number = 1800
): number[] => {
  let values = [];
  for (let i = 0; i < numOfValues; i++) {
    values.push(Math.random() * (max - min) + min);
  }
  return values;
};

const generateTimeIntervals = (timeScale: TimeScale): string[] => {
  const today = new Date();
  today.setMinutes(0);
  today.setSeconds(0);

  let values = [];

  switch (timeScale) {
    case "day":
      for (let i = 23; i >= 0; i--) {
        const intervalDate = new Date(today);
        intervalDate.setHours(today.getHours() - i);
        values.push(intervalDate.toString());
      }
      break;

    case "week":
      for (let i = 6; i >= 0; i--) {
        const intervalDate = new Date(today);
        intervalDate.setDate(today.getDate() - i);
        values.push(intervalDate.toString());
      }
      break;
    case "month":
      for (let i = 29; i >= 0; i--) {
        const intervalDate = new Date(today);
        intervalDate.setDate(today.getDate() - i);
        values.push(intervalDate.toString());
      }
      break;
    case "year":
      for (let i = 11; i >= 0; i--) {
        const intervalDate = new Date(today);
        intervalDate.setMonth(today.getMonth() - i);
        values.push(intervalDate.toString());
      }
      break;
  }

  return values;
};

const generateChartData = (
  timeScale: TimeScale,
  balance: number
): TransactionBalanceChartData[] => {
  let transactions: number[] = [];
  switch (timeScale) {
    case "day":
      transactions = generateRandomTransactions(24);
      break;
    case "week":
      transactions = generateRandomTransactions(7);
      break;
    case "month":
      transactions = generateRandomTransactions(30);
      break;
    case "year":
      transactions = generateRandomTransactions(12);
      break;
  }

  const timeIntervals = generateTimeIntervals(timeScale);

  let result: TransactionBalanceChartData[] = [];
  for (let i = 0; i < transactions.length; i++) {
    balance += transactions[i];
    result.push({
      time: timeIntervals[i],
      transaction: transactions[i],
      balance: balance,
    } as TransactionBalanceChartData);
  }

  return result;
};

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default defineEventHandler(async (event) => {
  const timeScale = getRouterParam(event, "scale")! as TimeScale;
  await sleep(1000);

  return generateChartData(timeScale, 2000);
});
