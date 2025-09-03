import { defineStore } from "pinia";
import type { Car } from "~/common/types/car";
import type { CarFilter } from "~/common/enums/filter.enum";
import type { CarInfo } from "~/common/types/car-info";

export const useCarsStore = defineStore("cars", {
    state: () => ({
        carsList: [] as Car[],
        searchResult: [] as Car[],
        searchQuery: "",
        searchFilter: "make" as CarFilter,
        carInfo: null as CarInfo | null,
        isLoading: true
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
                this.carInfo = await $fetch(`/api/cars/${id}`) as CarInfo;
            } catch (e) {
                console.error("Error loading car info:", e);
            } finally {
                this.isLoading = false;
            }
        },
        searchCars(query: string, filter: CarFilter) {
            this.searchQuery = query;
            this.searchFilter = filter;

            this.searchResult = this.carsList
                .filter(car => car[filter]
                .toLowerCase()
                .includes(query.toLowerCase()))
        }
    }
});