import create from 'zustand'

export const usePomodoro = create((set) => ({
  selectedTypeRadio: 'study',
  setSelectedTypeRadio: (type: string) => set((state) => ({ selectedTypeRadio: type })),

  timeSettings: {
    study: 0,
    'short break': 0,
    'long break': 0,
  },
  setTimeSettings: (payload: { study: number; 'short break': number; 'long break': number }) =>
    set((state) => ({ timeSettings: payload })),
}))
