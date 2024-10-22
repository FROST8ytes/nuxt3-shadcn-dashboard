<template>
  <div class="grid items-start lg:flex bg-background">
    <div class="lg:min-h-screen lg:sticky lg:top-0">
      <Sidebar />
    </div>
    <div class="flex-1 p-8 w-full overflow-y-scroll overflow-x-hidden">
      <slot />
    </div>
  </div>
</template>
