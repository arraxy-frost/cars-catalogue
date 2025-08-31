import { defineStore } from "pinia";
import type { Car } from "@/types/car"

export const useCarsStore = defineStore("cars", {
    state: () => ({
        carsList: [] as Car[],
        isLoading: false,
    }),
    actions: {
        async loadCarsList() {
            console.log("Load cars list");

            this.isLoading = true;

            try {
                this.carsList = await $fetch('api/cars');
            }
            catch (e) {
                console.error('Error loading cars list:', e);
            }
            finally {
                console.log("Cars loaded");
                this.isLoading = false;
            }
        }
    }
});