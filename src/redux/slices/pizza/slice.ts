import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPizzas } from './asyncActions'
import { IPizzaSliceState, Status, TPizza } from './types'

const initialState: IPizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

export type TSearchPizzaParams = {
    sortBy: String
    order: string
    category: string
    search: string
    currentPage: string
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<TPizza[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = []
            state.status = Status.ERROR
        })
    },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
