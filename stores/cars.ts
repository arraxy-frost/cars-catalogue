import { defineStore } from "pinia";
import type { Car } from "@/types/car"

export const useCarsStore = defineStore("cars", {
    state: () => ({
        carsList: [] as Car[],
        carInfo: {},
        isLoading: false,
    }),
    actions: {
        async loadCarsList() {
            try {
                this.isLoading = true;
                this.carsList = await $fetch('api/cars');
            }
            catch (e) {
                console.error('Error loading cars list:', e);
            }
            finally {
                this.isLoading = false;
            }
        },
        async loadCarInfo(id: number) {
            try {
                this.isLoading = true;
                this.carInfo = await $fetch(`/api/cars/${id}`);
            }
            catch (e) {
                console.error('Error loading car info:', e);
            }
            finally {
                this.isLoading = false;
            }
        }
    }
});