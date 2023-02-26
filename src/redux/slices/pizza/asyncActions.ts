import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { TSearchPizzaParams } from './slice'
import { TPizza } from './types'

export const fetchPizzas = createAsyncThunk<TPizza[], TSearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, currentPage, category, order, search } = params
        const { data } = await axios.get<TPizza[]>(
            `https://62f8bf373eab3503d1da91dd.mockapi.io/pizzasList?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )

        return data
    }
)
