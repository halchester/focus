export const calculateTodayTimeInterval = () => {
  let data = {}
  let now = new Date()

  data = {
    hour: now.getHours(),
    min: now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes(),
  }

  if (now.getHours() < 12) {
    data = {
      ...data,
      timeInterval: 'morning',
    }
  } else if (now.getHours() >= 12 && now.getHours() < 18) {
    data = {
      ...data,
      timeInterval: 'afternoon',
    }
  } else if (now.getHours() >= 18) {
    data = {
      ...data,
      timeInterval: 'evening',
    }
  }

  return data
}

export const calculateBreakTime = (studyingTime: number) =>
  Math.round(studyingTime * 1.2 - studyingTime)

const minuteSeconds = 60
const hourSeconds = 3600
const daySeconds = 86400

export const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0
export const getTimeMinutes = (time: number) => ((time % hourSeconds) / minuteSeconds) | 0
export const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0
export const getTimeDays = (time: number) => (time / daySeconds) | 0
