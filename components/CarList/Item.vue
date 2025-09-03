<script setup lang="ts">
import type { Car } from '~/common/types/car'

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
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    transition: background-color 0.4s ease-in-out;
}

.car-list__item:hover {
    background-color: #fdf0da;
}
</style>