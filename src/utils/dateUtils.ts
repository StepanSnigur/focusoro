import dayjs, { Dayjs } from 'dayjs'

export const getDiffInDays = (date: string) => {
  const today = dayjs().format('YYYY-MM-DD')
  const currentDate = dayjs(date)
  return currentDate.diff(today, 'day')
}
export const getFormattedNearDays = () => {
  return {
    today: dayjs().format('YYYY-MM-DD'),
    tomorrow: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  }
}
