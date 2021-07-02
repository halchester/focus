import create from 'zustand'

export const usePomodoro = create((set) => ({
  selectedTypeRadio: 'study',
  timeSettings: {
    study: 30,
    shortBreak: 5,
    longBreak: 15,
  },

  setSelectedTypeRadio: (type: string) => set((state) => ({ selectedTypeRadio: type })),
  setTimeSettings: (payload: { study: number; shortBreak: number; longBreak: number }) =>
    set((state) => ({ timeSettings: payload })),
}))
