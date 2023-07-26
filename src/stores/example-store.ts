import { GoogleSpreadsheet } from 'google-spreadsheet';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    getSheet() {
      const doc = new GoogleSpreadsheet(
        '<the sheet ID from the url>',
        serviceAccountAuth
      );
    },
  },
});
