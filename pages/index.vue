<script setup lang="ts">
import { useCarsStore } from "~/stores/cars";

const carsStore = useCarsStore();

onMounted(async () => {
    await carsStore.loadCarsList();
})
</script>
<template>
    <div class="container">
        <h1>Cars List</h1>
    </div>
</template>
<style scoped>
.container {
    padding: 16px;
}
</style>