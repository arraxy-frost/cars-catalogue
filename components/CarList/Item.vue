<script setup lang="ts">
import type { Car } from '@/types/car'

defineProps<{ car: Car }>();
</script>

<template>
    <div class="car-list__item">
        <h2>{{ car.make }} {{ car.model }} ({{ car.year }})</h2>
    </div>
</template>

<style scoped>
.car-list__item {
    cursor: pointer;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: background-color 0.4s ease-in-out;
}

.car-list__item:hover {
    background-color: #364152;
}
</style>