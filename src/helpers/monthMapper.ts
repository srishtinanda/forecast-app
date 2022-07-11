import { monthMapper } from "../constants"

export const getFormattedDate = (input: string) => {
    const dateArr = input.split('-')
    const day = dateArr[2]
    const month = dateArr[1] as keyof typeof monthMapper
    const monthValue = monthMapper[month]
    return `${day} ${monthValue}`
}
