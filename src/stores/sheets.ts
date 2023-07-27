import axios from 'axios';
import { defineStore } from 'pinia';

export interface SheetState {
  verben: Verb[];
  nomen: any[];
  adjektive: any[];
}

export interface Verb {
  grundform: string;
  prasens: string;
  prateritum: string;
  perfekt: string;
  bedeutung: string;
  beispiel: string;
  synonyme: string;
}

export const useSheetStore = defineStore('sheets', {
  state: (): SheetState => ({
    verben: [],
    nomen: [],
    adjektive: [],
  }),
  getters: {
    getVerben: (state) => state.verben,
  },
  actions: {
    async fetchSheet() {
      const sheetResponse = await axios.get(
        'https://api.sheetson.com/v2/sheets/verben',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer 0Q9pwKzbP6622ESVJ7Lzp8blNde1j9ynjgP1Uc5sp1XZGL4UnWWOC2zCORU',
            'X-Spreadsheet-Id': '1cz4SAePV011rWPZQ6IFfYfmNftpgXDefkmwABzp9s2k',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(sheetResponse.data.results);

      this.verben = sheetResponse.data.results;
    },
  },
});
