<script setup>
const open = ref(true);
</script>

<template>
  <div>
    <div class="flex lg:hidden z-50 items-center justify-between w-full h-full p-4">
      <Logo />
      <Icon @click="open = true" name="iconamoon:menu-burger-horizontal" class="z-50 cursor-pointer left-2 top-2"
        size="30" />
      <div v-if="open" class="fixed top-0 left-0 z-50 w-full h-screen bg-background">
        <Icon @click="open = false" name="material-symbols:close" class="absolute z-50 cursor-pointer right-4 top-4"
          size="30" />
        <SidebarMenu />
      </div>
    </div>
    <div class="hidden lg:flex w-[250px] h-screen flex-col justify-between border-r">
      <SidebarMenu />
      <SidebarDarkModeSwitcher />
    </div>
  </div>
</template>

<style scoped></style>
