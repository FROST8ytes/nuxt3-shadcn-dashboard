<script setup lang="ts">
import type { OverviewCardProp } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const props = defineProps<{ card: OverviewCardProp }>();
</script>

<template>
  <Card>
    <CardHeader class="px-4 pt-4 pb-2">
      <div class="flex items-center justify-between">
        <p>{{ props.card.title }}</p>
        <Badge class="bg-[color:hsl(160,81%,40%)] hover:bg-[color:hsl(160,81%,48%)] cursor-pointer">+{{
          props.card.progression }}
        </Badge>
      </div>
    </CardHeader>
    <CardContent class="flex items-center justify-end px-4 pt-0 pb-2 border-b">
      <div>
        <span class="text-foreground">{{ new Intl.NumberFormat("en-MY", {
          style: "currency", currency: "MYR"
        }).format(props.card.amount).toString() }}</span>
      </div>
    </CardContent>
    <CardFooter class="flex items-center justify-between gap-2 px-2 py-2">
      <div class="flex items-center justify-center w-8 h-8 rounded bg-muted">
        <Icon size="20" :name="props.card.icon" style="color: hsl(var(--muted-foreground));" />
      </div>
      <p class="text-xs grow">{{ props.card.description }}</p>
      <Button variant="outline">{{ props.card.label }}</Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>