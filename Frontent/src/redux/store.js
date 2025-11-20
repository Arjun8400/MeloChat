import { configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice.js'

export const store = configureStore({
  reducer: {
    // Add your slices here
    user: userSlice
  },
});