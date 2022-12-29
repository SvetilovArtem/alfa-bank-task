import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL, FILMS_URL, apiKey } from '../../api/api'
import { ItemType } from '../../types';

export interface Items {
  list: ItemType[],
  favorites: ItemType[] 
  status: string,
  error: string,
  removeItems: number[],
  currentPage: number,
  totalPages: number
}


const initialState: Items = {
  list: [],
  status: '',
  error: '',
  favorites: [],
  removeItems: [],
  currentPage: 1,
  totalPages: 0
}

export const fetchItems = createAsyncThunk(
    'items/getItems',
    
    async function(currentPage:number) {
        const resp = await fetch(BASE_URL+FILMS_URL+`?page=${currentPage}`, {
            method: "GET",
            headers: {
                'X-API-KEY': `${apiKey}`,
                'Content-Type': 'application/json',
    }})
        const data = resp.json()
        return data
    },
)

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addFavorites: (state, action) => {
      const findItem = state.favorites.find(f => f.kinopoiskId === action.payload.kinopoiskId)
      if(!findItem) {
        state.favorites.push({ ...action.payload})
      }

    },
    removeFavorites: (state, action) => {
      state.favorites = state.favorites.filter(f => f.kinopoiskId !== action.payload.kinopoiskId)
    },
    setRemoveItems: (state, action) => {
      const findItem = state.removeItems.find(f => f === action.payload)
      if(!findItem) {
        state.removeItems.push(action.payload.kinopoiskId)
      }
      
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }

  },
  extraReducers:  (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.list = action.payload.items
      state.totalPages = action.payload.totalPages
      state.status = ''
    })
    builder.addCase(fetchItems.pending, (state, action) => {
        state.status = 'Loading ...'
    })
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.status = 'Error!'
  })
  },
})

export const { addFavorites, removeFavorites, setRemoveItems, setCurrentPage } = itemsSlice.actions

export default itemsSlice.reducer