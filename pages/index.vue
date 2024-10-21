<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type TimeScale, type TransactionBalanceChartData } from "~/types";
import CustomChartTooltip from "@/components/CustomChartTooltip.vue";
import { LineChart } from "@/components/ui/chart-line";

const timeScales: TimeScale[] = ["day", "week", "month", "year"];

const loading = ref(true);
const chartData: Ref<TransactionBalanceChartData[]> = ref([]);
const timeScale: Ref<TimeScale> = ref("day" as TimeScale);

const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (text: string) =>
      text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

const changeTabs = async (e) => {
  loading.value = true;
  timeScale.value = e.target.innerText.toLowerCase();
  chartData.value = await $fetch<TransactionBalanceChartData[]>(
    `/api/overview/${timeScale.value}`
  );
  console.log(chartData.value);
  loading.value = false;
};

onBeforeMount(async () => {
  chartData.value = await $fetch<TransactionBalanceChartData[]>(
    `/api/overview/${timeScale.value}`
  );
  loading.value = false;
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
          <TabsTrigger
            v-for="timeScale in timeScales"
            :key="timeScale"
            :value="timeScale"
            @click="changeTabs"
          >
            {{ toTitleCase(timeScale) }}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          v-for="timeScale in timeScales"
          :key="timeScale"
          :value="timeScale"
        >
          <LineChart
            v-if="!loading"
            :data="chartData"
            index="time"
            :categories="['transaction', 'balance']"
            :x-formatter="
              (tick, i) => {
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
            "
            :y-formatter="
              (tick, i) => {
                return typeof tick === 'number'
                  ? `${new Intl.NumberFormat('en-MY', {
                      style: 'currency',
                      currency: 'MYR',
                    })
                      .format(tick)
                      .toString()}`
                  : '';
              }
            "
            :custom-tooltip="CustomChartTooltip"
          />
          <Skeleton v-else class="w-full h-[400px] rounded-xl" />
        </TabsContent>
      </Tabs>
    </main>
    <footer>
      <div class="flex items-center gap-4">
        <Skeleton
          v-for="(item, index) in 3"
          :key="index"
          class="w-full h-[260px] rounded-xl"
        />
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
