<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type TimeScale, type TransactionBalanceChartData } from "~/types";
import OverviewChartTooltip from "@/components/Overview/ChartTooltip.vue";
import { LineChart } from "@/components/ui/chart-line";

const timeScales: TimeScale[] = ["day", "week", "month", "year"];

const chartLoading = ref(true);
const chartData: Ref<TransactionBalanceChartData[]> = ref([]);
const timeScale: Ref<TimeScale> = ref("day" as TimeScale);

const cards = [
  {
    title: "Sales",
    progression: 12,
    amount: 1244.43,
    label: "View sales",
    description: "Sales of March 2024",
    icon: "solar:ticket-sale-outline",
  },
  {
    title: "Refunds",
    progression: 8,
    amount: 84.44,
    label: "View refunds",
    description: "Refunds since beginning of year",
    icon: "heroicons-outline:receipt-refund",
  },
  {
    title: "Payouts",
    progression: 14,
    amount: 899.99,
    label: "View payouts",
    description: "Payouts of this week",
    icon: "tabler:zoom-money",
  },
  {
    title: "Booty Calls",
    progression: 69,
    amount: 666420.69,
    label: "View Booty Calls",
    description: "Booty Calls of this week",
    icon: "icon-park-twotone:peach",
  },
];

const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (text: string) =>
      text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

const changeTabs = async (e) => {
  chartLoading.value = true;
  timeScale.value = e.target.innerText.toLowerCase();
  chartData.value = await $fetch<TransactionBalanceChartData[]>(
    `/api/overview/${timeScale.value}`
  );
  console.log(chartData.value);
  chartLoading.value = false;
};

onBeforeMount(async () => {
  chartData.value = await $fetch<TransactionBalanceChartData[]>(
    `/api/overview/${timeScale.value}`
  );
  chartLoading.value = false;
});
</script>

<template>
  <div class="grid gap-4 w-full">
    <header class="flex items-start justify-between">
      <div class="grow">
        <p>Hi, welcome back Ammar!</p>
        <h1>Dashboard</h1>
      </div>
      <Skeleton class="rounded-xl h-12 w-[120px]" />
    </header>
    <main class="grid gap-4">
      <Tabs :default-value="timeScale" class="w-full">
        <TabsList class="max-w-[400px]">
          <TabsTrigger v-for="timeScale in timeScales" :key="timeScale" :value="timeScale" @click="changeTabs">
            {{ toTitleCase(timeScale) }}
          </TabsTrigger>
        </TabsList>
        <TabsContent v-for="timeScale in timeScales" :key="timeScale" :value="timeScale">
          <LineChart v-if="!chartLoading" :data="chartData" index="time" :categories="['transaction', 'balance']"
            :x-formatter="(tick, i) => {
              const time = chartData[tick]['time'];
              const date = new Date(time);
              const options = {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              };
              return !isNaN(date.getTime())
                ? `${date.toLocaleString('en-US', options)}`
                : time;
            }
              " :y-formatter="(tick, i) => {
                return typeof tick === 'number'
                  ? `${new Intl.NumberFormat('en-MY', {
                    style: 'currency',
                    currency: 'MYR',
                  })
                    .format(tick)
                    .toString()}`
                  : '';
              }
                " :custom-tooltip="OverviewChartTooltip" />
          <Skeleton v-else class="w-full h-[400px] rounded-xl" />
        </TabsContent>
      </Tabs>
    </main>
    <footer>
      <div class="grid grid-cols-4 gap-4">
        <OverviewCard v-for="(item, index) in cards" :card="item" :key="index" />
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
