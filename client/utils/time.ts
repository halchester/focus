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
