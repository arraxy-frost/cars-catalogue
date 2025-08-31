<script setup lang="ts">
import { useCarsStore } from "~/stores/cars";

const router = useRouter();
const carsStore = useCarsStore();

const onClickItem = async (id: number) => {
    await router.push(`/card?model=${id}`);
};

onMounted(async () => {
    await carsStore.loadCarsList();
});
</script>
<template>
    <div class="container">
        <CarListItem
            v-for="car in carsStore.carsList"
            :key="car.id"
            :car="car"
            @click="onClickItem(car.id)"
        />
    </div>
</template>
<style scoped>
.container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>