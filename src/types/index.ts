interface DailyWeatherType {
    apparent_temperature_max: number[]
    apparent_temperature_min: number[]
    time: string[]
}
export interface AppStateType {
    location?: LocationState,
    dailyWeather?: DailyWeatherType,
    favorites: LocationState[],
    unit?: string
}
export interface LocationState {
    name: string;
    id: string;
    lat: string;
    long: string;
    country: string;
}
