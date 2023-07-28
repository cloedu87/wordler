import axios from 'axios'
import { map } from 'lodash'
import { defineStore } from 'pinia'

export interface SheetState {
  verben: Verb[]
  nomen: any[]
  adjektive: any[]
}

export interface Verb {
  grundform: string
  prasens: string
  prateritum: string
  perfekt: string
  bedeutung: string
  beispiel: string
  synonyme: string
}

export interface VerbDto {
  rowIndex: number
  '🇳🇱 NL Grundform': string
  '🇩🇪 DE Präsens (tegenwoordige tijd)': string
  '🇩🇪 DE Präteritum (verleden tijd)': string
  '🇩🇪 DE Perfekt (voltooid deelwoord)': string
  '👀 Beispiel': string
  '💡 Bedeutung': string
  '🟰 Synonyme': string
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
      )
      console.log(sheetResponse.data.results)

      this.verben = map(sheetResponse.data.results, (verb: VerbDto) => {
        return {
          grundform: verb['🇳🇱 NL Grundform'],
          prasens: verb['🇩🇪 DE Präsens (tegenwoordige tijd)'],
          prateritum: verb['🇩🇪 DE Präteritum (verleden tijd)'],
          perfekt: verb['🇩🇪 DE Perfekt (voltooid deelwoord)'],
          bedeutung: verb['💡 Bedeutung'],
          beispiel: verb['👀 Beispiel'],
          synonyme: verb['🟰 Synonyme'],
        }
      })
    },
  },
})
