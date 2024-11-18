import { defineStore } from 'pinia'

export const useMainStore = defineStore('counter', {
    state: () => {
        return {
            count: 0,
            homeMarker: {
                latitude: 0,
                longitude: 0
            },
            distance: 0.5,
            generatedLocations: {},
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        increment() {
            this.count++
        },
    }, persist: true,
})