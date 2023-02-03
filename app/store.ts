import { configureStore } from '@reduxjs/toolkit'
import questionsSlice from './questionsSlice'

export const store = configureStore({
  reducer: {
    [questionsSlice.name]: questionsSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch