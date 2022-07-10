import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppStateType } from '../types'

const FORECAST_URI = 'https://api.open-meteo.com/v1/forecast?daily=apparent_temperature_max,apparent_temperature_min&timezone=UTC'

export const fetchWeatherByLocation = createAsyncThunk(
    'location/getWeather',
    async (location: any, thunkAPI) => {
        const { long, lat } = location;
        try {
            const response = await fetch(`${FORECAST_URI}&latitude=${lat}&longitude=${long}`)
            const dailyWeather = await response.json()

            return dailyWeather
        } catch {
            console.log('Error')
        }
    }
)

const initialState: AppStateType = { favorites: []}

export const location = createSlice({
    name: 'location',
    initialState,
    reducers: {
        selectedLocation(state, action: PayloadAction<any>) {
            state.location = action.payload
        },
        addToFav(state, action: PayloadAction<any>) {
            state.favorites.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
            state.unit = action.payload.daily_units.apparent_temperature_max
            state.dailyWeather = action.payload.daily
        })
    },
})

export const { selectedLocation, addToFav } = location.actions

export default location.reducer