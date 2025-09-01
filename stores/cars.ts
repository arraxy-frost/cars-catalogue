import { defineStore } from "pinia";
import type { Car } from "@/types/car";

export const useCarsStore = defineStore("cars", {
    state: () => ({
        carsList: [] as Car[],
        searchResult: [] as Car[],
        carInfo: {},
        isLoading: false
    }),
    actions: {
        resetCarsList() {
            this.searchResult = [];
        },
        async loadCarsList() {
            try {
                this.isLoading = true;
                this.carsList = await $fetch("api/cars");
            } catch (e) {
                console.error("Error loading cars list:", e);
            } finally {
                this.isLoading = false;
            }
        },
        async loadCarInfo(id: number) {
            try {
                this.isLoading = true;
                this.carInfo = await $fetch(`/api/cars/${id}`);
            } catch (e) {
                console.error("Error loading car info:", e);
            } finally {
                this.isLoading = false;
            }
        },
        searchCars(query: string, filter: "make" | "model") {
            this.searchResult = this.carsList
                .filter(car => car[filter]
                .toLowerCase()
                .includes(query.toLowerCase()))
        }
    }
});