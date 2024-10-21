<script setup lang="ts">
defineProps<{
  title?: string;
  data: {
    name: string;
    color: string;
    value: any;
  }[];
}>();

const options = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};
</script>

<template>
  <Card class="text-sm">
    <CardContent class="p-3 min-w-[180px] flex flex-col gap-2">
      <div class="text-center text-lg font-semibold">
        {{ new Date(title).toLocaleString("en-US", options) }}
      </div>
      <div
        v-for="(item, key) in data"
        :key="key"
        class="flex justify-between items-center"
      >
        <div class="flex items-center">
          <span
            class="w-1 h-7 mr-4 rounded-full"
            :style="{ background: item.color }"
          />
          <span>{{ item.name }}</span>
        </div>
        <span class="font-semibold ml-4">{{
          new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR" })
            .format(item.value)
            .toString()
        }}</span>
      </div>
    </CardContent>
  </Card>
</template>
