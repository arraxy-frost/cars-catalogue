<script setup lang="ts">
import { useCarsStore } from "~/stores/cars";

const filter = ref<string>('')
const searchString = ref<string>('')
const router = useRouter();
const carsStore = useCarsStore();

const onChangeFilter = () => {
    console.log(`Select filter: ${filter.value}`)
    searchString.value = '';
    carsStore.resetCarsList()
}
const onSearchInput = async () => {
    if (searchString.value.length === 0) {
        carsStore.resetCarsList()
        return
    }

    carsStore.searchCars(searchString.value, filter.value.toLowerCase());
}
const onClickItem = async (id: number) => {
    await router.push(`/card?model=${id}`);
}

onMounted(async () => {
    await carsStore.loadCarsList()
    searchString.value = carsStore.searchQuery ?? "make";
    filter.value = carsStore.searchFilter;
})
</script>
<template>
    <div class="container">
        <div class="search-bar" v-if="!carsStore.isLoading">
            <select class="search-bar__filter"
                    v-model="filter"
                    @change="onChangeFilter"
            >
                <option>make</option>
                <option>model</option>
            </select>
            <input class="search-bar__input" type="text" v-model="searchString" @input="onSearchInput" />
        </div>
        <div class="loader" v-else>
            Загрузка списка автомобилей ...
        </div>
        <div class="car-list" v-if="carsStore.carsList">
            <CarListItem
                v-if="carsStore.searchResult"
                v-for="car in carsStore.searchResult"
                :key="car.id"
                :car="car"
                @click="onClickItem(car.id)"
            />
        </div>
    </div>
</template>
<style scoped>
.container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.search-bar {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    align-items: center;
}

.search-bar__filter,
.search-bar__input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
}

.search-bar__input {
    flex: 1;
}

.car-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.loader {
    padding: 12px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
</style>