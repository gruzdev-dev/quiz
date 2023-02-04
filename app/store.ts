import { configureStore } from '@reduxjs/toolkit'
import questionsSlice from './features/questionsSlice'
import studentSlice from '@/app/features/studentSlice'
import { localStorageMiddleware } from '@/app/middlewares/localStorage'

export const isClient = (): boolean => {
  return !(typeof window === 'undefined')
}

export const store = configureStore({
  reducer: {
    [questionsSlice.name]: questionsSlice.reducer,
    [studentSlice.name]: studentSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch