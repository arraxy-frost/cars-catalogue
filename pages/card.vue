<script setup lang="ts">
import { onMounted } from "vue";
import { useCarsStore } from "~/stores/cars";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const modelId = Number(route.query.model);
const carsStore = useCarsStore();

onMounted(async () => {
    // Упрощенная валидация. Лучше в будущем вынести в слой vue-router
    if (!modelId || isNaN(modelId)) {
        router.push("/");
        return;
    }

    await carsStore.loadCarInfo(modelId);
});
</script>

<template>
    <div class="car-card">
        <div v-if="carsStore.isLoading" class="car-card__loader">Загрузка...</div>

        <div v-else-if="carsStore.carInfo.model_id" class="car-card__content">
            <div class="car-card__info">
                <div class="car-card__basic">
                    <div class="car-param"><span class="label">Марка:</span> <span
                        class="value">{{ carsStore.carInfo.model_make_id }}</span></div>
                    <div class="car-param"><span class="label">Модель:</span> <span
                        class="value">{{ carsStore.carInfo.model_name }}</span></div>
                    <div class="car-param"><span class="label">Год:</span> <span
                        class="value">{{ carsStore.carInfo.model_year }}</span></div>
                </div>

                <div class="car-card__details">
                    <div class="car-param"><span class="label">Тип кузова:</span> <span
                        class="value">{{ carsStore.carInfo.model_body }}</span></div>
                    <div class="car-param"><span class="label">Двигатель:</span> <span
                        class="value">{{ carsStore.carInfo.model_engine_type }} {{ carsStore.carInfo.model_engine_cyl }} cyl, {{ carsStore.carInfo.model_engine_cc
                        }} cc</span></div>
                    <div class="car-param"><span class="label">Трансмиссия:</span> <span
                        class="value">{{ carsStore.carInfo.model_transmission_type }}</span></div>
                    <div class="car-param"><span class="label">Привод:</span> <span
                        class="value">{{ carsStore.carInfo.model_drive }}</span></div>
                    <div class="car-param"><span class="label">Вес:</span> <span
                        class="value">{{ carsStore.carInfo.model_weight_kg }} кг</span></div>
                    <div class="car-param"><span class="label">Расход (смешанный):</span> <span
                        class="value">{{ carsStore.carInfo.model_lkm_mixed }} л/100км</span></div>
                    <div class="car-param"><span class="label">Объем бака:</span> <span
                        class="value">{{ carsStore.carInfo.model_fuel_cap_l }} л</span></div>
                    <div class="car-param"><span class="label">Двери:</span> <span
                        class="value">{{ carsStore.carInfo.model_doors }}</span></div>
                    <div class="car-param"><span class="label">Страна:</span> <span
                        class="value">{{ carsStore.carInfo.make_country }}</span></div>
                </div>
            </div>
            <div class="car-card__image">
                Изображение машины
            </div>
        </div>

        <div v-else>
            Данные о машине не найдены.
        </div>
    </div>
</template>

<style scoped>
.car-card {
    max-width: 800px;
    margin: 24px auto;
    padding: 24px;
    border-radius: 16px;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 6px 12px rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.car-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.16);
    transform: translateY(-2px);
}

.car-card__loader {
    text-align: center;
    font-size: 1.2rem;
    color: #616161;
}

.car-card__content {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}

.car-card__image {
    flex: 1 1 300px;
    max-height: 250px;
    background-color: #f5f5f5;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9e9e9e;
    font-weight: 500;
    font-size: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.car-card__info {
    flex: 2 1 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.car-card__info > div {
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.car-card__basic, .car-card__details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #fafafa;
    padding: 16px;
    border-radius: 12px;
}

.car-param {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    color: #424242;
}

.car-param .label {
    font-weight: 600;
}

.car-param .value {
    color: #616161;
}
</style>
