<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="app">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.app{
  display: flex;
  main{
    flex: 1 1 0;
    @media (max-width: 768px) {
      padding-left: 6rem;
    }
  }

}
</style>
